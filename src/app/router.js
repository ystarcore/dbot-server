import { Router } from 'express'

import userRouter from './../users/users.router'
import authRouter from './../auth/auth.router'
import teamRouter from './../teams/teams.router'

const router = Router()

router.use('/users', userRouter)

router.use('/auth', authRouter)

router.use('/teams', teamRouter)

export default router
