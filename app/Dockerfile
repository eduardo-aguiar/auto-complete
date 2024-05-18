# app/Dockerfile
FROM node:18.17.0-alpine

WORKDIR /app

# Install libstdc++ for VSCode server compatibility
RUN apk update && apk add libstdc++

# Copy package.json and package-lock.json from the parent directory
COPY ../package.json ../package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

CMD ["npm", "run", "dev"]
