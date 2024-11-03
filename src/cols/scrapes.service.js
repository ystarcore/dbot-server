import Scrape from './scrapes.model'

/**
 * Get all scrapes.
 *
 * @returns {Promise}
 */
export function getAllScrapes() {
    return Scrape.find().sort('-createdAt')
  }

/**
 * Get scrapes.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getScrapes(query) {
  return Scrape.find({ ...query }).sort('-createdAt')
}

/**
 * Get a scrape by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getScrapeById(id) {
  return Scrape.findById({ _id: id }).populate('teamId')
}

/**
 * Get scrapes by teamID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getScrapesByTeamId(id) {
  return Scrape.find({ teamId: id })
}

/**
 * Get a scrape by teamID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getScrapeByTeamId(id) {
  return Scrape.findOne({ teamId: id }).sort('-createdAt')
}

/**
 * Add a new scrape.
 *
 * @param   {Object}  scrapeData
 * @returns {Promise}
 */
export function addScrape(scrapeData) {
  const scrape = new Scrape(scrapeData)

  return scrape.save()
}

/**
 * Delete a scrape by ID.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteScrapeById(id) {
  return Scrape.findByIdAndDelete(id)
}

/**
 * Remove scrapes by an array of IDs.
 *
 * @param   {Array}  ids
 * @returns {Promise}
 */
export function deleteScrapesByIds(ids) {
  return Scrape.deleteMany({ _id: { $in: ids } })
}
