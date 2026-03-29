export const handleApiResponse = (res, statusCode, data) => {
  res.statusCode = statusCode
  res.write(JSON.stringify(data))
  res.end(() => {
    console.log('Request is finished')
  })
}

export const filterDestinations = (destinations, locationType, locationName) => {
  return destinations.filter((destination) => {
      return destination[locationType].toLowerCase() === locationName.toLowerCase()
    })
}