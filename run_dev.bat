@echo off
title TBCPL Server
echo Starting TBCPL Web Application...
cd /d "%~dp0"
node server.js
pause
