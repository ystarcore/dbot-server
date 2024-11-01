import express from 'express'

import { upload } from './../middlewares/upload.middleware'
import { auth } from '../middlewares/auth.middleware'

import { createClient, fetchClient } from './clients.controller'

import { findTeamValidator } from '../teams/teams.validator'
import { findClientValidator } from './clients.validator'

const router = express.Router()

router.get('/:clientId', findClientValidator, fetchClient)

router.post('/:teamId', auth, findTeamValidator, upload, createClient)

export default router
