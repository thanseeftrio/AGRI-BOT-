@echo off
echo ==========================================================
echo 🌾 AgriBot AI: Building Native Android APK
echo ==========================================================
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=C:\Users\DELL\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

cd /d "%~dp0frontend\android"
echo Running Gradle assembleDebug...
call gradlew.bat assembleDebug

echo.
echo ==========================================================
echo APK Build Completed!
echo Output APK path: frontend\android\app\build\outputs\apk\debug\app-debug.apk
echo ==========================================================
pause
