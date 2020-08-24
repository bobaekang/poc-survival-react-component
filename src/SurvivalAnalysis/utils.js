import { result } from '../mockData'

export const fetchSurvivalResult = ({
  factorVariable,
  stratificationVariable,
}) =>
  Promise.resolve(
    result[
      factorVariable
        ? stratificationVariable
          ? `${factorVariable}_${stratificationVariable}`.toLowerCase()
          : factorVariable.toLowerCase()
        : 'all'
    ]
  )

export const getSurvivalSeries = (survival, userInput) =>
  userInput.factorVariable === '' || userInput.stratificationVariable === ''
    ? survival
    : survival.reduce((acc, { name, data }) => {
        const [factorKey, stratificationKey] = name.split(',')
        const stratificationValue = acc.hasOwnProperty(stratificationKey)
          ? [...acc[stratificationKey], { name: factorKey, data }]
          : [{ name: factorKey, data }]

        return { ...acc, [stratificationKey]: stratificationValue }
      }, {})

export const getXAxisTicks = (survival, step = 2) => {
  const times = survival.flatMap(({ data }) => data).map(({ time }) => time)
  const minTime = Math.floor(Math.min(...times))
  const maxTime = Math.ceil(Math.max(...times))

  const ticks = []
  for (let tick = minTime; tick <= maxTime; tick += step) ticks.push(tick)

  return ticks
}
