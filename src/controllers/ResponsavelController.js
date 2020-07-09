const database = require('../database/database')
const { dateFormat } = require('../utils/dateFormat')

module.exports = {
  async index(req, res) {
    // const { id } = req.params

    const id = await database('tbDoador')
      .where('idUsuario', req.idUsuario)
      .select('idResponsavel')
      .first()

    if(id) {
      const result = await database('tbResponsavel')
        .where('idResponsavel', id)
        .select('*')
        .first()

      const phoneNumbers = await database('tbTelefoneResponsavel')
        .where('idResponsavel', id)
        .pluck('numeroTelefoneResponsavel')

      result.numeroTelefoneResponsavel = phoneNumbers
      result.dataNascimentoResponsavel = dateFormat(result.dataNascimentoResponsavel)

      return res.status(200).json(result)
    } else {
      res.status(404).json({ error: 'This donor don\'t have a responsible' })
    }

  },
}
