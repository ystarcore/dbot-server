import mongoose from 'mongoose'

const histSchema = new mongoose.Schema({
  num: {
    type: Number
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  scrapedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Hist = mongoose.model('Hist', histSchema)

export default Hist
