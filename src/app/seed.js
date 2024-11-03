import mongoose from 'mongoose'

import { MONGO_URI } from '../app/config.js'
import { seedUsers } from './../users/users.seed'
import { seedLocations } from '../locations/locations.seed.js'

mongoose.connect = mongoose.connect(MONGO_URI)

mongoose.connection
  .on('open', () => console.log('DATABASE STATE', 'Connection Open'))
  .on('close', () => console.log('DATABASE STATE', 'Connection Close'))
  .on('error', (error) => console.log('DATABASE STATE', error))

const run = async () => {
  try {
    await seedUsers()

    await seedLocations()
  } catch (err) {
    console.log(err)
  } finally {
    mongoose.connection.close()
  }
}

run()
