import express from 'express'

import { auth } from '../middlewares/auth.middleware'

import { createTeam, editTeam, fetchAllTeams, fetchTeam, removeTeams } from './teams.controller'
import { findTeamValidator, teamValidator } from './teams.validator'

const router = express.Router()

router.get('/', fetchAllTeams)

router.get('/:teamId', findTeamValidator, fetchTeam)

router.post('/', auth, teamValidator, createTeam)

router.put('/:teamId', auth, findTeamValidator, teamValidator, editTeam)

router.delete('/', auth, removeTeams)

export default router
