import dotenv from 'dotenv'

dotenv.config()

export const APP_PORT = process.env.APP_PORT || '8888'
export const APP_HOST = process.env.APP_HOST || '0.0.0.0'
export const APP_SECRET = process.env.APP_PORT || 'secret'
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dbot'
