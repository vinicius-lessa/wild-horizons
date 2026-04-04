import http from 'node:http'
import { getDataFromDb } from './database/database.js'
import { handleApiResponse, filterPlaces, filterPlacesByQueryParams } from './utils/utilities.js';

const HOST = '127.0.0.1'
const PORT = 8000

const server = http.createServer(async (req, res) => {
  const route = req.url
  const method = req.method

  // Query String
  const urlObject = new URL(route, `http://${req.headers.host}`)
  const queryObject = Object.fromEntries(urlObject.searchParams)  

  const destinations = await getDataFromDb()

  // /api -----------------------------------------------------------------
  if (urlObject.pathname === '/api' && method === 'GET') {
    let filteredDestinations = destinations
    
    if (Object.keys(queryObject).length > 0) {      
      filteredDestinations = filterPlacesByQueryParams(destinations, queryObject)      
    }

    handleApiResponse(res, 200, filteredDestinations)
  }

  // /api/continent/<continent> -------------------------------------------
  else if (route.startsWith('/api/continent/') && method === 'GET') {
    const requestedContinent = route.split('/').pop() // Get last part

    // Filter destinations by continent
    const filteredDestinations = filterPlaces(destinations, 'continent', requestedContinent);
    handleApiResponse(res, 200, filteredDestinations)
  } 
  
  // /api/country/<country> ----------------------------------------------
  else if (route.startsWith('/api/country/') && method === 'GET') {
    const requestedCountry = route.split('/').pop()

    // Filter destinations by country
    const filteredDestinations = filterPlaces(destinations, 'country', requestedCountry)
    handleApiResponse(res, 200, filteredDestinations)
  }
  
  else {
    handleApiResponse(res, 404, {
      error: "not found", 
      message: "The requested route does not aexist"
    })
  }
})


server.listen(PORT, HOST, () => {
  console.log(`Server is running at ${HOST}:${PORT}`)
})