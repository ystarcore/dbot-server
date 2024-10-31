import { addClient, deleteClientsByIds, getAllClients, updateClientById } from './clients.service'

/**
 * Get a client.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchClient(req, res, _) {
  res.send({ client: req.client })
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
