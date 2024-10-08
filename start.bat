echo off
color d
cls
:a
pm2 start ecosystem.config.js
goto a