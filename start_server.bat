@echo off
title Chandu Bobbala Portfolio Server
cd /d "C:\Users\sandeep\Downloads\Portfolio"
echo Starting Portfolio Server on http://localhost:8000 ...
start "" "http://localhost:8000"
python -m http.server 8000
pause
