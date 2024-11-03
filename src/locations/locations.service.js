import Location from './locations.model'

/**
 * Get locations.
 *
 * @param   {Object}  query
 * @returns {Promise}
 */
export function getLocations(query) {
  return Location.find({ ...query })
}

/**
 * Get locations.
 *
 * @param   {string}  country
 * @returns {Promise}
 */
export async function getLocationsArr(country) {
  try {
    const rowData = await Location.find({ country })

    const data = rowData.map(({ name }) => name)

    return data
  } catch (err) {
    throw err
  }
}
