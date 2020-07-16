const database = require("../database/database")
const {
  dateFormat
} = require('../utils/dateFormat')
const moment = require('moment')

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
        'tbUnidadeMedida.descricaoUnidadeMedida',
        'tbDoacao.totalDoacao',
        'tbDoacao.dataDoacao',
        'tbDoacao.statusDoacao'
      ])
      .where('tbDoacao.idDoador', req.idDoador)
      .orderBy('tbDoacao.dataDoacao', 'desc')

    const gender = await database('tbDoador')
      .where('tbDoador.idDoador', req.idDoador)
      .join('tbSexo', {
        'tbDoador.idSexo': 'tbSexo.idSexo'
      })
      .select('tbSexo.descricaoSexo')
      .first()

    for (const doacao of doacoes) {
      // get percent to blood reload
      const presentDate = moment()
      const lastDate = moment(doacao.dataDoacao)

      const diffDays = presentDate.diff(lastDate, 'days')

      const BLOODRELOAD_DAYS = (gender.descricaoSexo === 'Masculino') ? 60 : 90

      const percent = Math.floor(diffDays / BLOODRELOAD_DAYS * 100)

      doacao.bloodReloadPercent = (percent > 100) ? 100 + '%' : percent + '%'
      //

      let date = dateFormat(doacao.dataDoacao)
      doacao.dataDoacao = date

      const months = [
        'jan',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez'
      ]

      let month = date.split('/')[1]
      let monthFormatted = undefined
      switch (month) {
        case '01':
          monthFormatted = 'jan'
          break
        case '02':
          monthFormatted = 'fev'
          break
        case '03':
          monthFormatted = 'mar'
          break
        case '04':
          monthFormatted = 'abr'
          break
        case '05':
          monthFormatted = 'mai'
          break
        case '06':
          monthFormatted = 'jun'
          break
        case '07':
          monthFormatted = 'jul'
          break
        case '08':
          monthFormatted = 'ago'
          break
        case '09':
          monthFormatted = 'set'
          break
        case '10':
          monthFormatted = 'out'
          break
        case '11':
          monthFormatted = 'nov'
          break
        case '12':
          monthFormatted = 'dez'
          break
      }

      let dateFormatted = date.split('/')
      dateFormatted.pop()
      dateFormatted[1] = monthFormatted

      doacao.dataDoacaoFormatted = `${dateFormatted[0]}/${dateFormatted[1]}`

      if (doacao.descricaoUnidadeMedida === 'Mililitro (ml)') {
        doacao.totalDoacao = 400 / 1000
        doacao.descricaoUnidadeMedida = 'Litros (l)'
      }

    }


    return res.status(200).json(doacoes)
  }
}
