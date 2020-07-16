const database = require('../database/database')
const {
  getCoords
} = require('../utils/geocoding')
const {
  where
} = require('../database/database')


module.exports = {
  async indexAll(req, res) {
    const [count] = await database('tbBancoSangue').count()
    res.header('X-Total-Count', count['count(*)'])

    const bancos = await database('tbBancoSangue').select('*')

    for (const banco of bancos) {
      const phoneNumbers = await database('tbTelefoneBancoSangue')
        .where('idBancoSangue', banco.idBancoSangue)
        .pluck('numeroTelefoneBanco')

      const horarios = await database('tbHorarioFuncionamentoBancoSangue')
        .where('tbHorarioFuncionamentoBancoSangue.idBancoSangue', banco.idBancoSangue)
        .join('tbDiaSemana', {
          'tbHorarioFuncionamentoBancoSangue.idDiaSemana': 'tbDiaSemana.idDiaSemana'
        })
        .select([
          'tbDiaSemana.descricaoDiaSemana',
          'tbHorarioFuncionamentoBancoSangue.horarioAbertura',
          'tbHorarioFuncionamentoBancoSangue.horarioFechamento'
        ])

      for (let horario of horarios) {
        let time = horario.horarioAbertura.split(':')
        time.pop()
        let timeFormatted = `${time[0]}:${time[1]}`
        horario.horarioAbertura = timeFormatted

        time = horario.horarioFechamento.split(':')
        time.pop()
        timeFormatted = `${time[0]}:${time[1]}`
        horario.horarioFechamento = timeFormatted
      }

      banco.horarioFuncionamento = horarios
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

    let horarios = await database('tbHorarioFuncionamentoBancoSangue')
      .where('tbHorarioFuncionamentoBancoSangue.idBancoSangue', id)
      .join('tbDiaSemana', {
        'tbHorarioFuncionamentoBancoSangue.idDiaSemana': 'tbDiaSemana.idDiaSemana'
      })
      .select([
        'tbDiaSemana.descricaoDiaSemana',
        'tbHorarioFuncionamentoBancoSangue.horarioAbertura',
        'tbHorarioFuncionamentoBancoSangue.horarioFechamento'
      ])

    for (let horario of horarios) {
      let time = horario.horarioAbertura.split(':')
      time.pop()
      let timeFormatted = `${time[0]}:${time[1]}`
      horario.horarioAbertura = timeFormatted

      time = horario.horarioFechamento.split(':')
      time.pop()
      timeFormatted = `${time[0]}:${time[1]}`
      horario.horarioFechamento = timeFormatted
    }

    banco.horarioFuncionamento = horarios
    banco.coords =
      await getCoords(banco.cepBancoSangue, banco.numeroEndBancoSangue)

    banco.numeroTelefoneBanco = phoneNumbers

    return res.json(banco)
  }
}
