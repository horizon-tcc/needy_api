const database = require("../database/database")
const DatePtBR = require('date-pt-br')

module.exports = {
  async indexAll(req, res) {
    const doacoes = await database('tbDoacao')
      .join('tbMaterialDoado', {
        'tbDoacao.idMaterialDoado': 'tbMaterialDoado.idMaterialDoado'
      })
      .leftJoin('tbResultadoDoacao', {
        'tbDoacao.idResultadoDoacao': 'tbResultadoDoacao.idResultadoDoacao'
      })
      .leftJoin('tbTipoDoacao', {
        'tbDoacao.idTipoDoacao': 'tbTipoDoacao.idTipoDoacao'
      })
      .leftJoin('tbUnidadeMedida', {
        'tbDoacao.idUnidadeMedida': 'tbUnidadeMedida.idUnidadeMedida'
      })
      .select([
        'tbDoacao.idDoacao',
        'tbDoacao.horaDoacao',
        'tbDoacao.idBancoSangue',
        'tbMaterialDoado.descricaoMaterialDoado',
        'tbResultadoDoacao.descricaoResultadoDoacao',
        'tbTipoDoacao.descricaoTipoDoacao',
        'tbDoacao.pesoDoadorDoacao',
        'tbDoacao.totalDoacao',
        'tbDoacao.dataDoacao',
        'tbUnidadeMedida.descricaoUnidadeMedida',
        'tbDoacao.statusDoacao'
      ])
      .where('tbDoacao.idDoador', req.idDoador)
      .orderBy('tbDoacao.dataDoacao', 'desc')

    const doacoesFormatted = doacoes.map(doacao => {
      let PORRA = new DatePtBR(doacao.dataDoacao)
      doacao.dataDoacao = PORRA.getDate()

      let month = PORRA.getMonth()
      month = month.substr(0, 3)
      let dateFormatted = `${PORRA.getDay()}/${month}`
      doacao.dataDoacaoFormatted = dateFormatted

      if(doacao.descricaoUnidadeMedida === 'Mililitro (ml)') {
        doacao.totalDoacao = 400 / 1000
        doacao.descricaoUnidadeMedida = 'Litros (l)'
      }

      return doacao
    })

    return res.status(200).json(doacoesFormatted)
  }
}
