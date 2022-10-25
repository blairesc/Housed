const process = require('process')
import fetch from 'node-fetch';

const qs = require('qs')

const handler = async function (event) {
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  const { REALTY_API_SECRET } = process.env;
  const URL = `https://realty-mole-property-api.p.rapidapi.com/rentalListings?${API_PARAMS}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': REALTY_API_SECRET,
      'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(URL, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return {
      statusCode: 200,
      body: JSON.stringify(response),
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
