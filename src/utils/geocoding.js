const NodeGeocoder = require('node-geocoder')
const cep = require('cep-promise')

const geocoderOptions = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
}
const geocoder = NodeGeocoder(geocoderOptions)

module.exports = {
  async getCoords(addressCEP, addressNumber) {
    const { street, neighborhood, city } = await cep(addressCEP)

    const [{ latitude, longitude }] = await geocoder.geocode({
      address: `${street}, ${addressNumber}`,
      zipcode: addressCEP,
      country: 'Brazil',
      city: city
    })

    return { latitude, longitude }
  }
}
