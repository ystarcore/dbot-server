import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    enum: ['UK', 'US'],
    trim: true
  }
})

const Location = mongoose.model('Location', locationSchema)

export default Location
