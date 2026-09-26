@echo off
echo ==========================================================
echo 🌾 AgriBot AI: Launching Android Studio Project
echo ==========================================================
set "ANDROID_STUDIO=C:\Program Files\Android\Android Studio\bin\studio64.exe"
set "PROJECT_DIR=%~dp0frontend\android"

if exist "%ANDROID_STUDIO%" (
    echo Opening AgriBot in Android Studio...
    start "" "%ANDROID_STUDIO%" "%PROJECT_DIR%"
) else (
    echo Android Studio not found at default location.
    echo Project path: %PROJECT_DIR%
)
pause
