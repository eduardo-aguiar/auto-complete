# Backend Service

## Build and Run

To build and run the application service using Docker, execute the following commands:

```sh
docker-compose build
docker-compose up
```

Use Curl to test api:

curl -X GET "http://localhost:3000/autocomplete?q=a&limit=10"
