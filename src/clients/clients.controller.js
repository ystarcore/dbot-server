import path from 'path'
import moment from 'moment'
import Boom from '@hapi/boom'
import fs from 'fs'
import { addClient, deleteClientsByIds } from './clients.service'

/**
 * Get a client.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchClient(req, res, next) {
  const {
    client: {
      filename,
      createdAt,
      teamId: { name }
    }
  } = req

  const filePath = path.resolve('uploads', filename)

  const fileName = `${name}-${moment(createdAt).format('YYYYMMDDHHmm')}.xlsx`

  try {
    if (!fs.existsSync(filePath)) return Boom.notFound('File not found')

    res.download(filePath, fileName)
  } catch (err) {
    next(err)
  }
}

/**
 * Create a client.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function createClient(req, res, next) {
  try {
    const { teamId } = req.params
    const { originalname: name, filename } = req.file

    const data = { teamId, name, filename }

    const client = await addClient(data)

    res.json({ client })
  } catch (err) {
    next(err)
  }
}

/**
 * Remove clients.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function removeClients(req, res, next) {
  try {
    const clients = await deleteClientsByIds(req.body.ids)

    res.json({ clients })
  } catch (err) {
    next(err)
  }
}
