import express from 'express'

import { uploadSingleFile, downloadFile } from './../middlewares/upload.middleware'
import { login } from './auth.controller'
import { userValidator } from '../users/users.validator'

const router = express.Router()

router.post('/login', userValidator, login)

router.post('/upload', uploadSingleFile, (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.')

  res.send(`File uploaded successfully: ${req.file.filename}`)
})

router.get('/download/:filename', downloadFile)

export default router
