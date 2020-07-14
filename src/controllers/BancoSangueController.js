const database = require('../database/database')
const {
  getCoords
} = require('../utils/geocoding')


module.exports = {
  async indexAll(req, res) {
    const [count] = await database('tbBancoSangue').count()
    res.header('X-Total-Count', count['count(*)'])

    const bancos = await database('tbBancoSangue').select('*')

    for (const banco of bancos) {
      const phoneNumbers = await database('tbTelefoneBancoSangue')
        .where('idBancoSangue', banco.idBancoSangue)
        .pluck('numeroTelefoneBanco')

      banco.numeroTelefoneBanco = phoneNumbers
      banco.coords =
        await getCoords(banco.cepBancoSangue, banco.numeroEndBancoSangue)
    }

    return res.json(bancos)
  },

  async index(req, res) {
    const {
      id
    } = req.params
    const banco = await database('tbBancoSangue')
      .where('idBancoSangue', id)
      .select('*')
      .first()

    const phoneNumbers = await database('tbTelefoneBancoSangue')
      .where('idBancoSangue', id)
      .pluck('numeroTelefoneBanco')

    banco.coords =
      await getCoords(banco.cepBancoSangue, banco.numeroEndBancoSangue)

    banco.numeroTelefoneBanco = phoneNumbers

    return res.json(banco)
  }
}
