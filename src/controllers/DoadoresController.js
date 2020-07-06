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
      .where('tbDoador.idUsuario', id)
      .join('tbSexo', {
        'tbSexo.idSexo': 'tbDoador.idSexo',
      })
      .join('tbFatorRh', {
        'tbFatorRh.idFatorRh': 'tbDoador.idFatorRh',
      })
      .join('tbTipoSanguineo', {
        'tbTipoSanguineo.idTipoSanguineo': 'tbDoador.idTipoSanguineo',
      })
      .join('tbUsuario', {
        'tbUsuario.idUsuario': 'tbDoador.idUsuario'
      })
      .select([
        'tbDoador.*',
        'tbSexo.descricaoSexo',
        'tbFatorRh.descricaoFatorRh',
        'tbTipoSanguineo.descricaoTipoSanguineo',
        'tbUsuario.emailUsuario',
        'tbUsuario.fotoUsuario',
        'tbUsuario.statusUsuario'
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
      .join('tbSexo', {
        'tbSexo.idSexo': 'tbDoador.idSexo',
      })
      .join('tbFatorRh', {
        'tbFatorRh.idFatorRh': 'tbDoador.idFatorRh',
      })
      .join('tbTipoSanguineo', {
        'tbTipoSanguineo.idTipoSanguineo': 'tbDoador.idTipoSanguineo',
      })
      .join('tbUsuario', {
        'tbUsuario.idUsuario': 'tbDoador.idUsuario'
      })
      .select([
        'tbDoador.*',
        'tbSexo.descricaoSexo',
        'tbFatorRh.descricaoFatorRh',
        'tbTipoSanguineo.descricaoTipoSanguineo',
        'tbUsuario.emailUsuario',
        'tbUsuario.fotoUsuario',
        'tbUsuario.statusUsuario'
      ])

    for (const doador of result) {

      const phoneNumbers = await database('tbTelefoneDoador')
        .where('idDoador', doador.idDoador)
        .pluck('tbTelefoneDoador.numeroTelefoneDoador')

      doador.numeroTelefoneDoador = phoneNumbers
      doador.dataNascimentoDoador = dateFormat(doador.dataNascimentoDoador)
    }

    return res.status(200).json(result)
  },
}
