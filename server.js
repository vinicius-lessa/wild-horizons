import http from 'node:http'
import { getDataFromDb } from './database/database.js'
import { handleApiResponse } from './utils/utilities.js';

const hostname = '127.0.0.1'
const port = 8000

const server = http.createServer(async (request, response) => {
  response.setHeader('Content-Type', 'application/json')

  const route = request.url
  const method = request.method

  const destinations = await getDataFromDb()

  if (route === '/api' && method === 'GET') {
    handleApiResponse(response, 200, destinations)
  }
  else if (request.url.startsWith('/api/continent') && method === 'GET') {
    // Get last part
    const targetContinent = request.url.split('/').pop()

    // Filter Asian Destinations
    const filteredDestinations = destinations.filter((destination) => {
      return destination.continent.toLowerCase() === targetContinent.toLowerCase()
    })
    
    handleApiResponse(response, 200, filteredDestinations)

  } else {
    handleApiResponse(response, 404, {
      error: "not found", 
      message: "The requested route does not exist"
    })
  }  
})


server.listen(port, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${port}`)
})