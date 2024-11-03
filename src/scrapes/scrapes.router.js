import express from 'express'

import { fetchAllScrapes, fetchScrape } from './scrapes.controller'
import { findScrapeValidator } from './scrapes.validator'


const router = express.Router()

router.get('/', fetchAllScrapes)

router.get('/:scrapeId', findScrapeValidator, fetchScrape)

export default router
