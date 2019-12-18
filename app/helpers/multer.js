import multer from 'multer'
import path from 'path'
import fs from 'fs'

const dir = path.join(__dirname, '../../public/imageupload')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync(dir)) {
      cb(null, dir)
    } else {
      fs.mkdirSync(path.join(__dirname, '../../public/imageupload'), '0777')
      fs.mkdirSync(dir, '0777')
      cb(null, dir)
    }
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname
    const fileNameToSave = `${Date.now()}_${fileName}`
    cb(null, fileNameToSave )
    req.filename = fileNameToSave
  }
})

const upload = multer({ storage : storage, fileFilter: fileFilter })

function fileFilter(req, file, callback) {
  const ext = path.extname(file.originalname)
  if (ext === '.svg') {
    req.fileValidationError = 'SVG format is not supported'

    return callback(null, false, new Error('SVG format is not supported'))
  }
  if (!['.png', '.jpg', '.gif', '.jpeg'].includes(ext.toLowerCase())) {
    return callback(null, false)
  }

  callback(null, true);
}

module.exports = upload
