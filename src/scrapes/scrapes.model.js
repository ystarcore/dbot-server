import mongoose from 'mongoose'

const scrapeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  client: {
    type: String,
    required: true
  },
  scrapedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Scrape = mongoose.model('Scrape', scrapeSchema)

export default Scrape
