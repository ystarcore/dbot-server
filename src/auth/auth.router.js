import express from 'express'

import { login } from './auth.controller'
import { userValidator } from '../users/users.validator'

const router = express.Router()

router.post('/login', userValidator, login)

export default router
