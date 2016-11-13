@echo off
cls
set BASE_DIR=%~dp0

node "%BASE_DIR%\mock-rest-service.js" -p 4000 -r "%BASE_DIR%\aps-api-routes.js"
