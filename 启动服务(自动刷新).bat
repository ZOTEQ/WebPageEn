@echo off
chcp 65001 >nul
title ZOTEQ English Website Server (Auto-Reload)
echo ========================================
echo    ZOTEQ 英文官网预览服务器
echo    (自动刷新模式)
echo ========================================
echo.
echo [1/2] 正在启动服务器...
echo.

cd /d "%~dp0"

if exist "JS-tests\node_modules\nodemon" (
    echo [2/2] 使用 nodemon 启动 (自动刷新)...
    echo.
    cd "JS-tests"
    npx nodemon dev-server.js
) else if exist "JS-tests\dev-server.js" (
    echo [警告] nodemon 未安装，使用普通模式启动
    echo.
    cd "JS-tests"
    node dev-server.js
) else if exist "dev-server.js" (
    node dev-server.js
) else (
    echo [错误] 找不到服务器文件！
    echo 请确保在正确的目录中运行此脚本。
    pause
    exit /b 1
)

pause
