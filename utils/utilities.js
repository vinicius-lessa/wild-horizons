export const handleApiResponse = (res, statusCode, data) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*') // Allow CORS for all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET') // Allow specific HTTP methods
  res.statusCode = statusCode
  
  res.write(JSON.stringify(data))

  res.end(() => {
    console.log('Request is finished')
  })
}

export const filterPlaces = (destinations, locationType, locationName) => {
  return destinations.filter((destination) => {
    return destination[locationType].toLowerCase() === locationName.toLowerCase()
  })
}

export const filterPlacesOpenToPublic = (destinations, isOpenToPublic) => {
  return destinations.filter((destination) => {
    return destination.is_open_to_public.toString().toLowerCase() === isOpenToPublic.toLowerCase()
  })
}

export const filterPlacesByQueryParams = (destinations, queryObject) => {
  const { continent, country, is_open_to_public: isOpenToPublic } = queryObject
  let filteredDestinations = destinations
  
  // Check for truthy/falsy
  if (continent) {
    filteredDestinations = filterPlaces(filteredDestinations, 'continent', continent)
  }

  if (country) {
    filteredDestinations = filterPlaces(filteredDestinations, 'country', country)
  }

  if (isOpenToPublic) {
    filteredDestinations = filterPlacesOpenToPublic(filteredDestinations, isOpenToPublic)
  }

  return filteredDestinations
}