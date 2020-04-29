const database = require('../database/database')
const { dateFormat } = require('../utils/dateFormat')

module.exports = {
    async index(req, res) { 
        const { id } = req.params
        
        const result = await database('tbDoador')
                        .where('idUsuario', id)
                        .join('tbResponsavel', {
                            'tbResponsavel.idResponsavel': 'tbDoador.idResponsavel' 
                        })
                        .join('tbSexo', {
                            'tbSexo.idSexo': 'tbDoador.idSexo'
                        })
                        .join('tbFatorRh', {
                            'tbFatorRh.idFatorRh': 'tbDoador.idFatorRh'
                        })
                        .join('tbTipoSanguineo', {
                            'tbTipoSanguineo.idTipoSanguineo': 'tbDoador.idTipoSanguineo'
                        })
                        .select([
                            'tbDoador.*',
                            'tbResponsavel.nomeResponsavel',
                            'tbResponsavel.cpfResponsavel',
                            'tbResponsavel.rgResponsavel',
                            'tbResponsavel.dataNascimentoResponsavel',
                            'tbSexo.descricaoSexo',
                            'tbFatorRh.descricaoFatorRh',
                            'tbTipoSanguineo.descricaoTipoSanguineo'
                        ])
                        .first()

        result.dataNascimentoResponsavel = await dateFormat(result.dataNascimentoResponsavel)
        result.dataNascimentoDoador = await dateFormat(result.dataNascimentoDoador)

        return res.json(result)
    }
}