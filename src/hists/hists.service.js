import fs from 'fs'
import path from 'path'

import Hist from './hists.model'
/**
 * Get all hist.
 *
 * @returns {Promise}
 */
export function getAllHists() {
  return Hist.find()
}

/**
 * Get hists.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getHists(query) {
  return Hist.find({ ...query })
}

/**
 * Add a new hist.
 *
 * @param   {Object}  histData
 * @returns {Promise}
 */
export function addHist(histData) {
  return Hist.updateOne({ url: histData.url }, histData, { upsert: true })
}

/**
 * Update a hist by ID.
 *
 * @param   {Array}  data
 * @returns {Promise}
 */
export function addHists(data) {
  return Hist.insertMany(data)
}

/**
 * Remove hists by query.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function deleteManyHists(query) {
  return Hist.deleteMany({ ...query })
}

const jsonDirectory = path.resolve('histories')

/**
 * Import history from json files.
 *
 * @returns {Promise}
 */
export async function importHistoryData() {
  try {
    const files = fs.readdirSync(jsonDirectory)

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(jsonDirectory, file)
        const rawData = fs.readFileSync(filePath, 'utf8')
        const dataObject = JSON.parse(rawData)

        const bulkOperations = []

        Object.keys(dataObject).forEach((key) => {
          for (let data of dataObject[key]) {
            bulkOperations.push({
              updateOne: {
                filter: { url: data.toString() },
                update: { $set: { url: data.toString() } },
                upsert: true
              }
            })
          }
        })

        if (bulkOperations.length > 0) {
          await Hist.bulkWrite(bulkOperations)
            .then(() => console.log(`Bulk write completed for file: ${file}`))
            .catch((error) => console.error(`Error performing bulk write operation for file: ${file}`, error))
        }
      }
    }

    console.log('Import completed successfully.')
  } catch (error) {
    console.error('Error importing history data:', error)
  }
}
