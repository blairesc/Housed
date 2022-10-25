const process = require('process')
import fetch from 'node-fetch';

const qs = require('qs')

const handler = async function (event) {
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  const { GOOGLE_API_SECRET } = process.env;
  const URL = `https://maps.googleapis.com/maps/api/streetview?size=500x500&fov=80&heading=70&pitch=0&${API_PARAMS}&key=${GOOGLE_API_SECRET}`;

  try {
    const response = await fetch(URL)
    let image = await response.buffer()
    return {
      statusCode: 200,
      headers: {
        'Content-type': 'image/jpeg'
      },
      body: image.toString('base64'),
      isBase64Encoded: true
    }
  } catch (error) {
    const { data, headers, status, statusText } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }

}

module.exports = { handler }
