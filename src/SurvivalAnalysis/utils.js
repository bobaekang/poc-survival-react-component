import { fetchResult as fetchMockSurvivalResult } from '../mockData'
import './typedef'

/**
 * Fetch survival result data from proof-of-concept service
 * @param {UserInput} userInput
 */
const fetchPocSurvivalResult = ({
  isTestingError,
  timeInterval,
  ...requestBody
}) =>
  isTestingError
    ? Promise.reject('Test error handling.')
    : fetch(process.env.REACT_APP_POC_MICROSERVICE_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) throw Error(`HTTP status: ${response.status}`)
          return response.json()
        })
        .catch((e) => console.error(e))

/**
 * @param {boolean} isUsingPocMicroservice
 */
export const fetchSurvivalResult = (isUsingPocMicroservice) =>
  isUsingPocMicroservice ? fetchPocSurvivalResult : fetchMockSurvivalResult

/**
 * Builds x-axis ticks array to use in plots
 * @param {SurvivalData[]|RisktableData[]} data
 * @param {number} step
 */
export const getXAxisTicks = (data, step = 2) => {
  const times = data.flatMap(({ data }) => data).map(({ time }) => time)
  const minTime = Math.floor(Math.min(...times))
  const maxTime = Math.ceil(Math.max(...times))

  const ticks = []
  for (let tick = minTime; tick <= maxTime; tick += step) ticks.push(tick)

  return ticks
}
