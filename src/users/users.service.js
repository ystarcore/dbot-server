import User from './users.model'

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return []
}

/**
 * Get a user with pass.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getUserWithPass(query) {
  return User.findOne({ ...query }).select('+password')
}

/**
 * Get a user by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUserById(id) {
  return User.findById(id)
}
