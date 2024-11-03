import path from 'path'
import moment from 'moment'
import Boom from '@hapi/boom'
import fs from 'fs'
import { getAllScrapes } from "./scrapes.service"

/**
 * Get all scrapes.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAllScrapes(_, res, next) {
  try {
    const scrapes = await getAllScrapes()

    res.json({ scrapes })
  } catch (err) {
    next(err)
  }
}


/**
 * Get a scrape.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchScrape(req, res, next) {
    const {
      scrape: {
        filename,
        name,
        createdAt,
      }
    } = req
  
    const filePath = path.resolve('uploads', filename)
  
    const fileName = `${name}-${moment(createdAt).format('YYYYMMDDHHmm')}.data.xlsx`
  
    try {
      if (!fs.existsSync(filePath)) return Boom.notFound('File not found')
  
      res.download(filePath, fileName)
    } catch (err) {
      next(err)
    }
  }