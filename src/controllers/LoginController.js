const database = require('../database/database')
const Token = require('../utils/jwt')

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
            try {
                const token = await Token.generate({ idUsuario })
                return res.json({ token })
            } catch (err) {
                console.error(err)
                res.status(500)
                return res.json({ error: 'Falha ao gerar o token.' })
            }

        } catch (err) {
            console.error(err)
            res.status(404)
            return res.json({ error: 'Login inválido!' })
        }
                                   
    }
}