@echo off
cls
set BASE_DIR=%~dp0
rem mongo/bin must be in path
setlocal
set server=%1%
if "%server%" == "" (
    set server=localhost
)

@echo Loading users...
mongoimport -h %server% --port 27017 -d aps -c users --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\tests\seed\users.json"

@echo Loading tokens...
mongoimport -h %server% --port 27017 -d aps -c tokens --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\tests\seed\tokens.json"

@echo Loading employees...
mongoimport -h %server% --port 27017 -d aps -c accounts --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\tests\seed\employees.json"

@echo Loading transactions...
mongoimport -h %server% --port 27017 -d aps -c grosses --drop --jsonArray --stopOnError --file "%BASE_DIR%\..\tests\seed\grosses.json"


rem pause
endlocal
