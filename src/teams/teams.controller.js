import { addTeam, deleteTeamsByIds, getAllTeams, getAllTeamsWithClient, updateTeamById } from './teams.service'

/**
 * Get all teams.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAllTeams(_, res, next) {
  try {
    const teams = await getAllTeams()

    res.json({ teams })
  } catch (err) {
    next(err)
  }
}

/**
 * Get all teams.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAllTeamsWithClient(_, res, next) {
  try {
    const teams = await getAllTeamsWithClient()

    res.json({ teams })
  } catch (err) {
    next(err)
  }
}

/**
 * Get a team.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchTeam(req, res, _) {
  res.send({ team: req.team })
}

/**
 * Create a team.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function createTeam(req, res, next) {
  try {
    const team = await addTeam(req.body)

    res.json({ team })
  } catch (err) {
    next(err)
  }
}

/**
 * Update a team.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function editTeam(req, res, next) {
  try {
    const {
      body: data,
      params: { teamId }
    } = req

    const team = await updateTeamById(teamId, data)

    res.json({ team })
  } catch (err) {
    next(err)
  }
}

/**
 * Remove a team.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function removeTeam(req, res, next) {
  try {
    const team = await deleteTeamsByIds(req.params.teamId)

    res.json({ team })
  } catch (err) {
    next(err)
  }
}

/**
 * Remove teams.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function removeTeams(req, res, next) {
  try {
    const teams = await deleteTeamsByIds(req.body.ids)

    res.json({ teams })
  } catch (err) {
    next(err)
  }
}
