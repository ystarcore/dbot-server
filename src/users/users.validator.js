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
async function findUserValidator(req, res, next) {
  try {
    const user = await userService.getUser(req.params.userId)

    if (!user?._id) throw Boom.notFound('Can not found the user.')

    req.other = user

    next()
  } catch (err) {
    next(err)
  }
}

export { findUserValidator, userValidator }
