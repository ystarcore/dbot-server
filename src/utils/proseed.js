import mongoose from 'mongoose'

import { MONGO_URI } from '../app/config.js'
import { proseedLeads } from '../leads/leads.service.js'

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    mongoose.connection
      .on('open', () => console.log('DATABASE STATE', 'Connection Open'))
      .on('close', () => console.log('DATABASE STATE', 'Connection Close'))
      .on('error', (error) => console.log('DATABASE STATE', error))

    await proseedLeads()

    console.log("Done")
  } catch (err) {
    console.error('DATABASE STATE', err)
  } finally {
    mongoose.connection.close()
  }
}

run()
