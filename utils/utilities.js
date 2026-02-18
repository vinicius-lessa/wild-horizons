export const handleApiResponse = (response, statusCode, data) => {
  response.statusCode = statusCode
  response.write(JSON.stringify(data))
  response.end(() => {
    console.log('Request is finished')
  })
}