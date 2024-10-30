import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'

import { APP_SECRET } from '../app/config'
import { getUser } from '../users/users.service'

/**
 * Checking Auth
 *
 * @param  {object}   req  Request
 * @param  {object}   res  Response
 * @param  {function} next Enable the process to go on
 */
export const auth = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization']

  if (!authorizationHeader) throw next(Boom.unauthorized('No authorization header provided'))

  const token = authorizationHeader.split(' ')[1]

  if (!token) throw next(Boom.unauthorized('No token provided'))

  let userID

  try {
    const decoded = jwt.verify(token, APP_SECRET)
    userID = decoded.userID
  } catch (err) {
    throw next(Boom.unauthorized('Invalid or expired token'))
  }

  const user = await getUser(userID)

  if (!user || !user.name) throw next(Boom.unauthorized('User not found'))

  req.user = user
  
  next()
}
