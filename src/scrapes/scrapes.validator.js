import Boom from '@hapi/boom'

import * as scrapeService from './scrapes.service'

/**
 * Validate scrape's existence.
 *
 * @param   {Object}   req  Request object
 * @param   {Object}   res  Response object
 * @param   {Function} next Next middleware function
 * @returns {Promise}
 */
async function findScrapeValidator(req, _, next) {
  try {
    const scrape = await scrapeService.getScrapeById(req.params.scrapeId)

    if (!scrape?._id) throw Boom.notFound('Can not found the scrape.')

    req.scrape = scrape

    next()
  } catch (err) {
    next(err)
  }
}

export { findScrapeValidator }
