import Joi from '@hapi/joi'
import Boom from '@hapi/boom'

import validate from '../utils/validate'
import * as teamService from './teams.service'

// Validation schema
const schema = Joi.object({
  name: Joi.string().label('name').required()
})

/**
 * Validate create/update team request.
 *
 * @param   {Object}   req  Request object
 * @param   {Object}   res  Response object
 * @param   {Function} next Next middleware function
 * @returns {Promise}
 */
async function teamValidator(req, _, next) {
  try {
    await validate(req.body, schema)

    next()
  } catch (err) {
    next(err)
  }
}

/**
 * Validate team's existence.
 *
 * @param   {Object}   req  Request object
 * @param   {Object}   res  Response object
 * @param   {Function} next Next middleware function
 * @returns {Promise}
 */
async function findTeamValidator(req, res, next) {
  try {
    const team = await teamService.getTeamById(req.params.id)

    if (!team?._id) throw Boom.notFound('Can not found the team.')

    req.team = team

    next()
  } catch (err) {
    next(err)
  }
}

export { findTeamValidator, teamValidator }
