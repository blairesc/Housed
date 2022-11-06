const axios = require('axios')
const qs = require('qs')

exports.handler = async (event) => {
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  const { GOOGLE_API_SECRET } = process.env;
  const URL = `https://maps.googleapis.com/maps/api/streetview?size=500x500&fov=80&heading=70&pitch=0&${API_PARAMS}&key=${GOOGLE_API_SECRET}`;

  try {
    const response = await axios.get(URL, {responseType: 'arraybuffer'})
    let image = await Buffer.from(response.data, 'binary').toString('base64')

    return {
      statusCode: 200,
      body: image,
      isBase64Encoded: true
    }
    
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({status, statusText, headers, data}),
    }
  }
};