import http from 'node:http';

// console.log("Hello World!");

const PORT = 8000;

const server = http.createServer((request, response) => {
  response.end("Hello from my API!");
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))