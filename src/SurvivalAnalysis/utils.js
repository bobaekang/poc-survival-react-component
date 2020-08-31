import { fetchResult as fetchMockSurvivalResult } from '../mockData'

const fetchPocSurvivalResult = ({ timeInterval, ...userInput }) =>
  fetch(process.env.REACT_APP_POC_MICROSERVICE_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  }).then((response) => response.json())

export const fetchSurvivalResult = (isUsingPocMicroservice) =>
  isUsingPocMicroservice ? fetchPocSurvivalResult : fetchMockSurvivalResult

export const getXAxisTicks = (data, step = 2) => {
  const times = data.flatMap(({ data }) => data).map(({ time }) => time)
  const minTime = Math.floor(Math.min(...times))
  const maxTime = Math.floor(Math.max(...times)) + 1

  const ticks = []
  for (let tick = minTime; tick <= maxTime; tick += step) ticks.push(tick)

  return ticks
}
