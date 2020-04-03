const database = require('../database/database')

module.exports = {
    async validate(req, res) {
        const { email, senha } = req.body

        if(!(email && senha))
            return res.status(400).json({ error: 'Login inválido!' })

        const id = await database('tbUsuario')
                                    .where({
                                        emailUsuario: email,
                                        senhaUsuario: senha
                                    })
                                    .select('idUsuario')
                                    .first()
        
        if(!id)
            return res.status(404).json({ error: 'Login inválido!' })

        return res.json(id)
                                    
    }
}