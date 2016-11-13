@echo off
cls
set BASE_DIR=%~dp0

node "%BASE_DIR%\generate-jwt.js" -t 846975bf8beb36d7f561221de255aa8180a7dde3 -u dd90e400-abec-11e5-9ecd-d98e8e26428e -n jdoe -f John -l Doe -r user > "%BASE_DIR%\..\tests\seed\jwt.json"
