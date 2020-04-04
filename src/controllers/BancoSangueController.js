const database = require('../database/database')

module.exports = {
    async indexAll(req, res) {
        
        const [count] = await database('tbBancoSangue').count()
        const result = await database('tbBancoSangue').select('*')

        res.header('X-Total-Count', count['count(*)'])
        return res.json(result)
    },

    async index(req, res) {
        const { id } = req.params
        const result = await database('tbBancoSangue')
                                .where('idBancoSangue', id)
                                .select('*')
                                .first()
        
        return res.json(result)
    }
}