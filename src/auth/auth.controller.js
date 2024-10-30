import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'

import { APP_SECRET } from '../app/config'

import { getUserById, getUserWithPass } from '../users/users.service'

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function login(req, res, next) {
  try {
    const { username, password } = req.body

    let user = await getUserWithPass({ username })

    if (!user?.username) throw Boom.unauthorized('Invalid Username')

    const isMatch = await user.comparePassword(password)

    if (!isMatch) throw Boom.unauthorized('Incorrect password')

    const token = jwt.sign({ username: user.username }, APP_SECRET, { expiresIn: '8d' })

    user = await getUserById(user._id)

    res.json({ user, token })

    return { user }
  } catch (err) {
    next(err)
  }
}
