const ExcelJS = require('exceljs')
import path from 'path'

import Lead from './leads.model'

import { getAllTeamsWithClient } from '../teams/teams.service'
import { getAllHists } from '../hists/hists.service'
import { getLocationsArr } from '../locations/locations.service'

/**
 * Get all lead.
 *
 * @returns {Promise}
 */
export function getAllLeads() {
  return Lead.find().sort('num')
}

/**
 * Get leads.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getLeads(query) {
  return Lead.find({ ...query })
}

/**
 * Remove leads by query.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function deleteManyLeads(query) {
  return Lead.deleteMany({ ...query })
}

/**
 * Proseed leads.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */

const clientsDir = path.resolve('uploads')

export async function proseedLeads() {
  try {
    const teams = await getAllTeamsWithClient()
    const leads = await getAllLeads()
    const rawHist = await getAllHists()
    const ukLocation = await getLocationsArr('UK')
    const usLocation = await getLocationsArr('US')

    const hist = rawHist.map(({ url }) => url.trim())

    for (const item of teams) {
      const { name, filename } = item

      const filePath = path.join(clientsDir, filename)

      const wb = new ExcelJS.Workbook()

      await wb.xlsx.readFile(filePath)

      const ws = wb.getWorksheet(1)

      const clientNumRow = []
      const jobTitles = []
      let checkLocation = ''

      ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return

        const num = row.getCell('A').value
        const isNeed = row.getCell('D').value
        const jobTitle = row.getCell('E').value

        if (num) if (isNeed === 'yes') clientNumRow.push(+num)
        if (jobTitle) jobTitles.push(jobTitle)
        if (jobTitle) jobTitles.push(jobTitle.toString().toLowerCase().trim())
        if (rowNumber === 2) checkLocation = row.getCell('G').value
      })

      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Sheet1')
      worksheet.columns = [
        { header: 'Company', key: 'company', width: 100 },
        { header: 'Job Title', key: 'title', width: 100 },
        { header: 'Location', key: 'location', width: 100 },
        { header: 'Link', key: 'url', width: 400 }
      ]

      leads.map((lead) => {
        const { num, location, url, jobTitle, company } = lead
        if (!clientNumRow.includes(num)) return

        // if (!jobTitles.includes(jobTitle?.toLowerCase().trim())) return

        if (hist.includes(url)) return

        let passLocation = false

        if (checkLocation === 'UK') {
          passLocation =
            ukLocation.some((tmpLocation) => location.toLowerCase().includes(tmpLocation.toLowerCase())) &&
            !usLocation.some((tmpLocation) => location.toLowerCase().includes(tmpLocation.toLowerCase()))
          console.log('@@@@@@@@@@@@@@@@', passLocation)
        } else if (checkLocation === 'US') {
          passLocation =
            usLocation.some((tmpLocation) => location.toLowerCase().includes(tmpLocation.toLowerCase())) &&
            !ukLocation.some((tmpLocation) => location.toLowerCase().includes(tmpLocation.toLowerCase()))
        } else {
          passLocation = [...usLocation, ...ukLocation].some((tmpLocation) =>
            location.toLowerCase().includes(tmpLocation.toLowerCase())
          )
        }

        if (!passLocation) return

        worksheet.addRow({ company, title: jobTitle, location, url })
      })

      const newFilePath = path.join(clientsDir, `new-${name}.xlsx`)

      await workbook.xlsx.writeFile(newFilePath)
    }
  } catch (err) {
    throw err
  }
}