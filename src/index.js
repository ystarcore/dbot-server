import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import mongoose from 'mongoose'

import routes from './app/router'
import * as errorHandler from './middlewares/error.middleware'
import { APP_HOST, APP_PORT, MONGO_URI } from './app/config'
import { download } from './middlewares/upload.middleware'

mongoose.connect = mongoose.connect(MONGO_URI)

mongoose.connection
  .on('open', () => console.log('DATABASE STATE', 'Connection Open'))
  .on('close', () => console.log('DATABASE STATE', 'Connection Open'))
  .on('error', (error) => console.log('DATABASE STATE', error))

// EXPORT CONNECTION
module.exports = mongoose

const app = express()

app.set('port', APP_PORT)
app.set('host', APP_HOST)

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(errorHandler.bodyParser)

// API Routes
app.use('/api', routes)
app.get('/downloads/:filename', download)

// Error Middleware
app.use(errorHandler.genericErrorHandler)
app.use(errorHandler.methodNotAllowed)

app.listen(app.get('port'), app.get('host'), () => {
  console.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`)
})

export default app
