import "server-only";
import path from "node:path";
import fs from "node:fs";

export interface SiteRequestRow {
  id: number;
  siteUrl: string;
  siteName: string;
  siteFeature: string | null;
  targets: string;
  status: string;
  submittedAt: number;
  submitterIp?: string | null;
  userAgent?: string | null;
  reviewedAt?: number | null;
  reviewedBy?: string | null;
  commitSha?: string | null;
  commitUrl?: string | null;
  skipped?: string | null;
}

export interface Statement<T = any> {
  run(params?: Record<string, unknown> | any[]): { lastInsertRowid: number | bigint; changes: number };
  get(...args: any[]): T | undefined;
  all(...args: any[]): T[];
}

export interface DatabaseLike {
  prepare(sql: string): Statement;
  pragma(sql: string): void;
  exec(sql: string): void;
}

class JsonDb implements DatabaseLike {
  private filePath: string;
  private rows: SiteRequestRow[] = [];
  private nextId = 1;

  constructor() {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.filePath = path.join(dataDir, "site_requests.json");
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        this.rows = JSON.parse(raw);
        this.nextId = this.rows.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
      }
    } catch (e) {
      console.warn("Failed to read site_requests.json, starting with empty store", e);
      this.rows = [];
      this.nextId = 1;
    }
  }

  private save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.rows, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to persist site_requests.json", e);
    }
  }

  pragma(_sql: string): void {}
  exec(_sql: string): void {}

  prepare(sql: string): Statement {
    const trimmed = sql.trim();
    const self = this;

    // 1. INSERT query
    if (/^INSERT\s+INTO\s+site_requests/i.test(trimmed)) {
      return {
        run(params: Record<string, any>) {
          const id = self.nextId++;
          const row: SiteRequestRow = {
            id,
            siteUrl: String(params.siteUrl ?? ""),
            siteName: String(params.siteName ?? ""),
            siteFeature: params.siteFeature ? String(params.siteFeature) : null,
            targets: String(params.targets ?? "[]"),
            status: String(params.status ?? "pending"),
            submittedAt: Number(params.submittedAt ?? Date.now()),
            submitterIp: params.submitterIp ? String(params.submitterIp) : null,
            userAgent: params.userAgent ? String(params.userAgent) : null,
          };
          self.rows.push(row);
          self.save();
          return { lastInsertRowid: id, changes: 1 };
        },
        get() { return undefined; },
        all() { return []; },
      };
    }

    // 2. COUNT query: SELECT COUNT(*) as c FROM site_requests WHERE status = 'pending' OR status IS NULL
    if (/SELECT\s+COUNT\(\*\)\s+as\s+c/i.test(trimmed)) {
      return {
        run() { return { lastInsertRowid: 0, changes: 0 }; },
        get() {
          const c = self.rows.filter(
            (r) => !r.status || r.status === "pending"
          ).length;
          return { c };
        },
        all() {
          return [{ c: self.rows.length }];
        },
      };
    }

    // 3. SELECT by ID: SELECT ... FROM site_requests WHERE id = ?
    if (/WHERE\s+id\s*=\s*\?/i.test(trimmed)) {
      return {
        run() { return { lastInsertRowid: 0, changes: 0 }; },
        get(id: number | string) {
          const num = Number(id);
          return self.rows.find((r) => r.id === num);
        },
        all(id: number | string) {
          const num = Number(id);
          const found = self.rows.find((r) => r.id === num);
          return found ? [found] : [];
        },
      };
    }

    // 4. SELECT by status & limit: SELECT ... WHERE status = ? ... LIMIT ?
    if (/WHERE\s+status\s*=\s*\?/i.test(trimmed)) {
      return {
        run() { return { lastInsertRowid: 0, changes: 0 }; },
        get(status: string) {
          return self.rows.find((r) => r.status === status);
        },
        all(status: string, limit = 100) {
          return self.rows
            .filter((r) => r.status === status)
            .sort((a, b) => b.submittedAt - a.submittedAt)
            .slice(0, Number(limit) || 100);
        },
      };
    }

    // 5. SELECT all with limit
    if (/FROM\s+site_requests.*ORDER\s+BY.*LIMIT/i.test(trimmed)) {
      return {
        run() { return { lastInsertRowid: 0, changes: 0 }; },
        get() {
          return self.rows.slice().sort((a, b) => b.submittedAt - a.submittedAt)[0];
        },
        all(limit = 100) {
          return self.rows
            .slice()
            .sort((a, b) => b.submittedAt - a.submittedAt)
            .slice(0, Number(limit) || 100);
        },
      };
    }

    // 6. UPDATE query: UPDATE site_requests SET ... WHERE id = @id
    if (/^UPDATE\s+site_requests/i.test(trimmed)) {
      return {
        run(params: Record<string, any>) {
          const id = Number(params.id);
          const idx = self.rows.findIndex((r) => r.id === id);
          if (idx !== -1) {
            self.rows[idx] = {
              ...self.rows[idx],
              status: params.status !== undefined ? String(params.status) : self.rows[idx].status,
              reviewedBy: params.reviewedBy !== undefined ? String(params.reviewedBy) : self.rows[idx].reviewedBy,
              reviewedAt: params.reviewedAt !== undefined ? Number(params.reviewedAt) : self.rows[idx].reviewedAt,
              commitSha: params.commitSha !== undefined ? String(params.commitSha) : self.rows[idx].commitSha,
              commitUrl: params.commitUrl !== undefined ? String(params.commitUrl) : self.rows[idx].commitUrl,
              skipped: params.skipped !== undefined ? String(params.skipped) : self.rows[idx].skipped,
            };
            self.save();
            return { lastInsertRowid: id, changes: 1 };
          }
          return { lastInsertRowid: 0, changes: 0 };
        },
        get() { return undefined; },
        all() { return []; },
      };
    }

    // Fallback statement
    return {
      run() { return { lastInsertRowid: 0, changes: 0 }; },
      get() { return undefined; },
      all() { return self.rows; },
    };
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __tbcpl_sqlite: DatabaseLike | undefined;
}

const g = globalThis as typeof globalThis & {
  __tbcpl_sqlite?: DatabaseLike;
};

export function getDb(): DatabaseLike {
  if (!g.__tbcpl_sqlite) {
    g.__tbcpl_sqlite = new JsonDb();
  }
  return g.__tbcpl_sqlite;
}
