import Boom from '@hapi/boom'

import * as clientService from './clients.service'

/**
 * Validate client's existence.
 *
 * @param   {Object}   req  Request object
 * @param   {Object}   res  Response object
 * @param   {Function} next Next middleware function
 * @returns {Promise}
 */
async function findClientValidator(req, res, next) {
  try {
    const client = await clientService.getClientById(req.params.clientId)

    if (!client?._id) throw Boom.notFound('Can not found the client.')

    req.client = client

    next()
  } catch (err) {
    next(err)
  }
}

export { findClientValidator }
