const multer = require('multer')
const database = require('../database/database')
const multerConfig = require('../config/multer')

const multerMiddleware = multer(multerConfig).single('image')

module.exports = {
  upload(req, res) {

    if (!req.idUsuario)
      return res.status(400).end()

    multerMiddleware(req, res, err => {
      if (err instanceof multer.MulterError)
        return res.json({
          succes: false,
          error: err.message
        })
      else if (err)
        return res.json({
          succes: false,
          error: err.message
        })

      if (req.file.filename) {

        database('tbUsuario')
          .where('idUsuario', req.idUsuario)
          .update({
            fotoUsuario: req.file.filename
          })
          .then(() => {
            return res.status(200).json({
              filename: req.file.filename
            })
          })
          .catch(err => {
            return res.json({
              error: err
            })
          })
      }
    })
  }
}
