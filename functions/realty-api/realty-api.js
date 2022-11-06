const axios = require('axios')
const qs = require('qs')

exports.handler = async (event) => {
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  const { REALTY_API_SECRET } = process.env;

  const options = {
    method: 'GET',
    url: `https://realty-mole-property-api.p.rapidapi.com/rentalListings?${API_PARAMS}`,
    headers: {
      'X-RapidAPI-Key': REALTY_API_SECRET,
      'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
    }
  };

   try {
    const { data } = await axios.request(options)

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
};

