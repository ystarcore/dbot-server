import HttpStatus from 'http-status-codes'

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  res.json('hello world')
}
