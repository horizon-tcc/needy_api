const database = require('../database/database')

module.exports = {
    async validate(req, res) {
        const { email, senha } = req.body

        if(!(email && senha)) {
            res.status(400)
            return res.json({ error: 'Login inválido!' })
        }

        try {
            const { idUsuario } = await database('tbUsuario')
                                        .where({
                                            emailUsuario: email,
                                            senhaUsuario: senha
                                        })
                                        .select('idUsuario')
                                        .first()
            return res.json( { success: true, idUsuario })
        
        } catch(err) {
            console.error(err)
            res.status(404)
            return res.json({ success: false, error: 'Login inválido!' })
        }
                                    
    }
}