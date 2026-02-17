import http from 'node:http';
import { getDataFromDb } from './database/database.js';

const hostname = '127.0.0.1'
const port = 8000

const server = http.createServer(async (request, response) => {
  const route = request.url
  const method = request.method

  if (route === '/api' && method === 'GET') {
    const destinations = await getDataFromDb()
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 200;
    response.write(JSON.stringify(destinations))
  }

  response.end(() => {
    console.log('Request is finished');
  })
})

server.listen(port, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${port}`)
})