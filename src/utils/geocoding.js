const axios = require('axios')
const cep = require('cep-promise')

async function getCoords(addrCEP, addrNumber) {
  const addr = await cep(addrCEP)

  const addrFormatted = `${addr.street},
                         ${addrNumber},
                         ${addr.neighborhood},
                         ${addr.city}`

  const res = await axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {
      key: process.env.GOOGLE_API_KEY,
      sensor: false,
      address: addrFormatted
    }
  })

  return (res.data.results[0].geometry.location)
}

module.exports = {
  getCoords
}
