@echo off
npx concurrently "npm --prefix ./fronted run dev" "npm --prefix ./backend run start:dev"
pause
