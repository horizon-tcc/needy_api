const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const database = require('../database/database')

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err)
          return cb(err, false)

        const fileName =
          `${ hash.toString('hex') + path.extname(file.originalname) }`

        database('tbUsuario')
          .pluck('fotoUsuario')
          .then(results => {
            if (results.indexOf(fileName) != -1)
              return cb(new Error('Filename generate error! Try again.'), false)
          })

        return cb(null, fileName)
      })
    }
  }),

  limits: {
    fileSize: 10 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype))
      return cb(null, true)
    else {
      res.status(415)
      return cb(new Error('Invalid file type.'), false)
    }
  }
}
