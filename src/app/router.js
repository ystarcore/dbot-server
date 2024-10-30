import { Router } from 'express'

import userRouter from './../users/users.router'
import authRouter from './../auth/auth.router'

const router = Router()

router.use('/users', userRouter)

router.use('/auth', authRouter)

export default router
