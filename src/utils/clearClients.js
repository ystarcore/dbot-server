const ExcelJS = require('exceljs')
import mongoose from 'mongoose'
import path from 'path'

import { MONGO_URI } from '../app/config.js'
import { getAllTeamsWithClient } from '../teams/teams.service.js'

const clientsDir = path.resolve('uploads')
const clientsPath = path.join(clientsDir, 'clients.xlsx')

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    mongoose.connection
      .on('open', () => console.log('DATABASE STATE', 'Connection Open'))
      .on('close', () => console.log('DATABASE STATE', 'Connection Close'))
      .on('error', (error) => console.log('DATABASE STATE', error))

    const teams = await getAllTeamsWithClient()
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(clientsPath)
    const worksheet = workbook.getWorksheet(1)

    let rawData = []

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return // Skip header row

      const rowData = {
        A: row.getCell('A').value,
        B: row.getCell('B').value,
        C: row.getCell('C').value,
        D: row.getCell('D').value
      }

      rawData.push(rowData)
    })

    for (const team of teams) {
      const { filename } = team

      const teamFilePath = path.join(clientsDir, filename)
      const teamWorkbook = new ExcelJS.Workbook()
      await teamWorkbook.xlsx.readFile(teamFilePath)
      let teamWorksheet = teamWorkbook.getWorksheet(1)

      const oldData = {}
      const jobTitles = []
      let location = ''

      teamWorksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return // Skip header row
        if (rowNumber === 2) location = row.getCell('G').value
        if (row.getCell('E').value && typeof row.getCell('E').value === 'string') jobTitles.push(row.getCell('E').value)

        oldData[`${row.getCell('A').value}`] = {
          A: row.getCell('A').value,
          B: row.getCell('B').value,
          C: row.getCell('C').value,
          D: row.getCell('D').value
        }
      })

      teamWorkbook.removeWorksheet(1)
      teamWorksheet = teamWorkbook.addWorksheet('Sheet1')

      const headerRow = teamWorksheet.addRow(['ID', 'Company', 'URL', 'Yes', 'Job titles', 'Bot Speed', 'Location'])
      headerRow.eachCell((cell) => {
        cell.font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } } // White font color
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF00FF00' } // Green background color
        }
      })

      rawData.forEach((item) => {
        teamWorksheet.addRow([+item.A, item.B, item.C, oldData[`${item.A}`]?.D || ''])
      })

      jobTitles.forEach((title, index) => {
        teamWorksheet.getCell(`E${index + 2}`).value = title
      })

      teamWorksheet.getCell('G2').value = location

      teamWorksheet.columns = [
        { key: 'A', width: 8 },
        { key: 'B', width: 30 },
        { key: 'C', width: 50 },
        { key: 'D', width: 8 },
        { key: 'E', width: 30 },
        { key: 'F', width: 20 },
        { key: 'G', width: 20 }
      ]

      await teamWorkbook.xlsx.writeFile(teamFilePath)
    }
  } catch (err) {
    console.error('DATABASE STATE', err)
  } finally {
    mongoose.connection.close()
  }
}

run()
