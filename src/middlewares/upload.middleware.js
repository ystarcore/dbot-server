import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

export const uploadSingleFile = upload.single('file')

export const downloadFile = (req, res) => {
  const __dirname = path.resolve()

  const filePath = path.join(__dirname, 'uploads', req.params.filename)

  res.download(filePath, (err) => {
    if (err) res.status(404).send('File not found')
  })
}
