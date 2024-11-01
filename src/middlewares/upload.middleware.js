import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (info, file, cb) => {
    console.log('sdfsfd', info.team, file)
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

export const upload = multer({
  storage
}).single('file')

export const download = (req, res) => {
  const __dirname = path.resolve()
  const filePath = path.join(__dirname, 'uploads', req.params.filename)
  res.download(filePath, (err) => {
    if (err) {
      console.error(err)
      res.status(404).send('File not found')
    }
  })
}
