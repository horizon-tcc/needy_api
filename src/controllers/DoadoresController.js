const database = require('../database/database')
const { dateFormat } = require('../utils/dateFormat')
const isValidPass = require('../utils/validations/password')

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
        // 'tbDoador.*',
        'tbDoador.idDoador',
        'tbDoador.nomeDoador',
        'tbDoador.dataNascimentoDoador',
        'tbDoador.cpfDoador',
        'tbDoador.rgDoador',
        'tbDoador.logradouroDoador',
        'tbDoador.bairroDoador',
        'tbDoador.cepDoador',
        'tbDoador.numeroEndDoador',
        'tbDoador.complementoEndDoador',
        'tbDoador.cidadeDoador',
        'tbDoador.ufDoador',
        'tbDoador.idUsuario',
        'tbDoador.statusDoador',//
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
  },

  async update(req, res) {

    if(!isValidPass(req.body.novaSenha))
      return res.status(400).json({ error: 'Password malformatted!' })

    database('tbUsuario')
      .where('tbUsuario.idUsuario', req.idUsuario)
      .update({
        senhaUsuario: req.body.novaSenha
      })
      .then(() => {
        res.status(200)
        res.json({ success: true })
      })
      .catch(err => {
        console.log(err)
        res.status(400)
        return res.json({ error: err.message })
      })
  }
}
