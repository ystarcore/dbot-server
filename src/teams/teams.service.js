import Team from './teams.model'

/**
 * Get all team.
 *
 * @returns {Promise}
 */
export function getAllTeams() {
  return Team.find()
}

/**
 * Get teams.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getTeams(query) {
  return Team.find({ ...query })
}

/**
 * Get a team by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getTeamById(id) {
  return Team.findById({ _id: id })
}

/**
 * Add a new team.
 *
 * @param   {Object}  teamData
 * @returns {Promise}
 */
export function addTeam(teamData) {
  const team = new Team(teamData)

  return team.save()
}

/**
 * Update a team by ID.
 *
 * @param   {Number|String}  id
 * @param   {Object}         data
 * @returns {Promise}
 */
export function updateTeamById(id, data) {
  return Team.findByIdAndUpdate(id, { $set: data }, { new: true })
}

/**
 * Update a teams.
 *
 * @param   {Number|String}  query
 * @param   {Object}         data
 * @returns {Promise}
 */
export function updateTeam(query, data) {
  return Team.updateMany(query, data)
}

/**
 * Delete a team by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteTeamById(id) {
  return Team.findByIdAndDelete(id)
}

/**
 * Remove teams by an array of IDs.
 *
 * @param   {Array}  ids
 * @returns {Promise}
 */
export function deleteTeamsByIds(ids) {
  return Team.deleteMany({ _id: { $in: ids } })
}
