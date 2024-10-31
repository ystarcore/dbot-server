import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teem'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Client = mongoose.model('Client', clientSchema)

export default Client

