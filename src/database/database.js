const knex = require('knex')
const dbconf = require('./knexfile')

const database = knex(dbconf.development)

module.exports = database