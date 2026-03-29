import http from 'node:http'
import { getDataFromDb } from './database/database.js'
import { handleApiResponse, filterDestinations } from './utils/utilities.js';

const hostname = '127.0.0.1'
const port = 8000

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const route = req.url
  const method = req.method

  const destinations = await getDataFromDb()

  // /api -----------------------------------------------------------------
  if (route === '/api' && method === 'GET') {
    handleApiResponse(res, 200, destinations)
  }

  // /api/continent/<continent> -------------------------------------------
  else if (req.url.startsWith('/api/continent/') && method === 'GET') {
    const requestedContinent = req.url.split('/').pop() // Get last part

    // Filter destinations by continent
    const filteredDestinations = filterDestinations(destinations, 'continent', requestedContinent);
    handleApiResponse(res, 200, filteredDestinations)
  } 
  
  // /api/country/<country> ----------------------------------------------
  else if (req.url.startsWith('/api/country/') && method === 'GET') {
    const requestedCoutry = req.url.split('/').pop()

    // Filter destinations by country
    const filteredDestinations = filterDestinations(destinations, 'country', requestedCoutry)
    handleApiResponse(res, 200, filteredDestinations)
  }
  
  else {
    handleApiResponse(res, 404, {
      error: "not found", 
      message: "The requested route does not aexist"
    })
  }
})


server.listen(port, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${port}`)
})