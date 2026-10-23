@echo off
setlocal
cd /d "%~dp0"

where bun >nul 2>nul
if not errorlevel 1 goto use_bun

where npx >nul 2>nul
if errorlevel 1 (
  echo Node.js with npm/npx or Bun is required to run this project.
  pause
  exit /b 1
)

call npx --yes bun@1.2.1 install --frozen-lockfile
if errorlevel 1 (
  echo Dependency installation failed.
  pause
  exit /b 1
)
call npx --yes bun@1.2.1 run dev -- --host 0.0.0.0
if errorlevel 1 (
  echo The development server exited with an error.
  pause
  exit /b 1
)
goto done

:use_bun
call bun install --frozen-lockfile
if errorlevel 1 (
  echo Dependency installation failed.
  pause
  exit /b 1
)
call bun run dev -- --host 0.0.0.0
if errorlevel 1 (
  echo The development server exited with an error.
  pause
  exit /b 1
)

:done
endlocal
