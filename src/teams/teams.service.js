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
 * Get all team.
 *
 * @returns {Promise}
 */
export async function getAllTeamsWithClient() {
  try {
    const teams = await Team.aggregate([
      {
        $lookup: {
          from: 'clients',
          let: { teamId: '$_id' },
          pipeline: [
            // Match the team ID
            { $match: { $expr: { $eq: ['$teamId', '$$teamId'] } } },
            // Sort by createdAt in descending order to get the latest client first
            { $sort: { createdAt: -1 } }
          ],
          as: 'clientsData'
        }
      },
      {
        // Get the first (latest) client or null if no clients are present
        $addFields: {
          latestClient: { $arrayElemAt: ['$clientsData', 0] }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          createdAt: 1,
          clientId: { $ifNull: ['$latestClient._id', null] },
          filename: { $ifNull: ['$latestClient.filename', null] },
          updatedAt: { $ifNull: ['$latestClient.createdAt', null] }
        }
      },
      {
        $sort: { createdAt: -1 } // Sort by the 'name' field in ascending order
      }
    ])

    return teams
  } catch (err) {
    throw err
  }
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
