const database = require('../database/database')
const {
  dateFormat
} = require('../utils/dateFormat')

module.exports = {
  async index(req, res) {
    const {
      id
    } = req.params

    const result = await database('tbDoador')
      .where('idUsuario', id)
      .join('tbSexo', {
        'tbSexo.idSexo': 'tbDoador.idSexo',
      })
      .join('tbFatorRh', {
        'tbFatorRh.idFatorRh': 'tbDoador.idFatorRh',
      })
      .join('tbTipoSanguineo', {
        'tbTipoSanguineo.idTipoSanguineo': 'tbDoador.idTipoSanguineo',
      })
      .join('tbTelefoneDoador', {
        'tbTelefoneDoador.idDoador': 'tbDoador.idDoador'
      })
      .select([
        'tbDoador.*',
        'tbSexo.descricaoSexo',
        'tbFatorRh.descricaoFatorRh',
        'tbTipoSanguineo.descricaoTipoSanguineo',
        'tbTelefoneDoador.numeroTelefoneDoador'
      ])
      .first()

    const phoneNumbers = await database('tbTelefoneDoador')
      .where('idDoador', id)
      .pluck('tbTelefoneDoador.numeroTelefoneDoador')

    result.numeroTelefoneDoador = phoneNumbers
    result.dataNascimentoDoador = dateFormat(result.dataNascimentoDoador)


    return res.status(200).json(result)
  },

  async indexAll(req, res) {
    const result = await database('tbDoador')
      .select('*')

    for (const doador of result) {

      const phoneNumbers = await database('tbTelefoneDoador')
        .where('idDoador', doador.idDoador)
        .pluck('tbTelefoneDoador.numeroTelefoneDoador')

      doador.numeroTelefoneDoador = phoneNumbers
      doador.dataNascimentoDoador = dateFormat(doador.dataNascimentoDoador)
    }

    console.log(result)
    return res.status(200).json(result)
  },
}
