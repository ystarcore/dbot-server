import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'

import { APP_SECRET } from '../app/config'
import { getUserById } from '../users/users.service'

/**
 * Checking Auth
 *
 * @param  {object}   req  Request
 * @param  {object}   res  Response
 * @param  {function} next Enable the process to go on
 */
export const auth = async (req, _, next) => {
  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) throw Boom.unauthorized('No authorization header provided')

    const [scheme, token] = authorizationHeader.split(' ')

    if (scheme !== 'Bearer' || !token)
      throw Boom.unauthorized('Invalid authorization format. Token must be a Bearer token.')

    let decoded

    try {
      decoded = jwt.verify(token, APP_SECRET)
    } catch (err) {
      throw Boom.unauthorized('Invalid or expired token.')
    }

    const user = await getUserById(decoded.id)

    if (!user?._id) throw Boom.unauthorized('User not found')

    req.user = user

    next()
  } catch (err) {
    next(err)
  }
}
