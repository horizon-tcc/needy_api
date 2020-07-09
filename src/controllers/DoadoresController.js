const database = require('../database/database')
const { dateFormat } = require('../utils/dateFormat')

module.exports = {
  async index(req, res) {

    const doador = await database('tbDoador')
      .where('tbDoador.idUsuario', req.idUsuario)
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
      .where('tbTelefoneDoador.idDoador', 1)
      .pluck('tbTelefoneDoador.numeroTelefoneDoador')

    doador.numeroTelefoneDoador = phoneNumbers
    doador.dataNascimentoDoador = dateFormat(doador.dataNascimentoDoador)


    return res.status(200).json(doador)
  }
}
