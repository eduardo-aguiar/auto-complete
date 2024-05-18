@echo off
npx concurrently "npm --prefix ./app run dev" "npm --prefix ./backend run start:dev"
pause
