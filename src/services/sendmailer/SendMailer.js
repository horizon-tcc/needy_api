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

        transporter.sendMail({
            from: `Needy <${process.env.SENDMAILER_USER}>`,
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.text
        }).then(message => {
            return res.json({ success: true })
        }).catch(err => {
            return res.json({ success: false })
        })

    }
}