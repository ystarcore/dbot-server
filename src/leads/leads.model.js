import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
