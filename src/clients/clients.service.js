import Client from './clients.model'

/**
 * Get clients.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getClients(query) {
  return Client.find({ ...query })
}

/**
 * Get a client by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getClientById(id) {
  return Client.findById({ _id: id }).populate('teamId')
}

/**
 * Get clients by teamID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getClientsByTeamId(id) {
  return Client.find({ teamId: id })
}

/**
 * Get a client by teamID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getClientByTeamId(id) {
  return Client.findOne({ teamId: id }).sort('-createdAt')
}

/**
 * Add a new client.
 *
 * @param   {Object}  clientData
 * @returns {Promise}
 */
export function addClient(clientData) {
  const client = new Client(clientData)

  return client.save()
}

/**
 * Delete a client by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteClientById(id) {
  return Client.findByIdAndDelete(id)
}

/**
 * Remove clients by an array of IDs.
 *
 * @param   {Array}  ids
 * @returns {Promise}
 */
export function deleteClientsByIds(ids) {
  return Client.deleteMany({ _id: { $in: ids } })
}
