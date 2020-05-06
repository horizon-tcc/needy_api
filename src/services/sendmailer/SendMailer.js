const nodemailer = require('nodemailer')

module.exports = {
    async sendmail(req, res) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 456,
            secure: true,
            auth: {
                user: process.env.SENDMAILER_USER,
                pass: process.env.SENDMAILER_PASS
            }
        })

        const remetenteEmail = (req.body.remetente) 
        ? req.body.remetenteEmail : process.env.SENDMAILER_USER
        
        const remetenteNome = (req.body.remetenteNome) 
        ? req.body.remetenteNome : 'Horizon'


        const email = `<strong> Nome: ${ remetenteNome } </strong> <br> 
                       <strong> E-mail: ${ remetenteEmail } </strong> <br> 
                       <article> ${ req.body.texto } </article>`

        
        transporter.sendMail({
            from: `Needy <${process.env.SENDMAILER_USER}>`,
            to: req.body.para,
            subject: req.body.assunto,
            html: email
        }).then(message => {
            return res.json({
                success: true
            })
        }).catch(err => {
            return res.json({
                success: false
            })
        })

    }
}