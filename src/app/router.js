import { Router } from 'express'

import userRouter from './../users/users.router'
import authRouter from './../auth/auth.router'
import teamRouter from './../teams/teams.router'
import clientRouter from './../clients/clients.router'

const router = Router()

router.use('/users', userRouter)

router.use('/auth', authRouter)

router.use('/teams', teamRouter)

router.use('/clients', clientRouter)

export default router
