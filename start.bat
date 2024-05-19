@echo off
npx concurrently "npm --prefix ./frontend run dev" "npm --prefix ./backend run start:dev"
pause
