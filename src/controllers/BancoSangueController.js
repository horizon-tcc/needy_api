const database = require('../database/database')

module.exports = {
  async indexAll(req, res) {
    const [count] = await database('tbBancoSangue').count()
    res.header('X-Total-Count', count['count(*)'])

    const result = await database('tbBancoSangue').select('*')

    for(const bancoSangue of result) {
      const phoneNumbers = await database('tbTelefoneBancoSangue')
        .where('idBancoSangue', bancoSangue.idBancoSangue)
        .pluck('numeroTelefoneBanco')

      bancoSangue.numeroTelefoneBanco = phoneNumbers
    }

    return res.json(result)
  },

  async index(req, res) {
    const { id } = req.params
    const result = await database('tbBancoSangue')
      .where('idBancoSangue', id)
      .select('*')
      .first()

    const phoneNumbers = await database('tbTelefoneBancoSangue')
      .where('idBancoSangue', id)
      .pluck('numeroTelefoneBanco')

    result.numeroTelefoneBanco = phoneNumbers

    return res.json(result)
  }
}
