import Joi from '@hapi/joi'
import Boom from '@hapi/boom'

import validate from '../utils/validate'
import * as userService from './users.service'

// Validation schema
const schema = Joi.object({
  username: Joi.string().label('username').required(),
  password: Joi.string().label('password').required()
})

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req  Request object
 * @param   {Object}   res  Response object
 * @param   {Function} next Next middleware function
 * @returns {Promise}
 */
async function userValidator(req, res, next) {
  try {
    await validate(req.body, schema)

    next()
  } catch (err) {
    next(err)
  }
}

/**
 * Validate user's existence.
 *
 * @param   {Object}   req  Request object
 * @param   {Object}   res  Response object
 * @param   {Function} next Next middleware function
 * @returns {Promise}
 */
async function findUser(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id)

    if (!user || !user.id) throw Boom.notFound('Can not found the user.')

    req.user = other

    next()
  } catch (err) {
    next(err)
  }
}

export { findUser, userValidator }
