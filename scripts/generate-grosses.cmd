@echo off
cls
set BASE_DIR=%~dp0

node "%BASE_DIR%\generate-grosses.js" -e b8f43f35-9712-4780-a7a3-7e025043bca8 -e a5de925b-0155-4328-8a2c-aa266dbe32c3 -e 1ab35951-16e7-4f52-b5ad-88300080205d -e 9db0f7af-32c3-42e4-87d6-62deaaa6e531 -e 46128f4d-e213-4cb6-99d8-3b947e6882c2 -c 21 > "%BASE_DIR%\..\tests\seed\grosses.json"
