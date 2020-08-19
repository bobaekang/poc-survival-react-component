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
  userInput.factorVariable === ''
    ? [{ name: 'All', data: survival }]
    : userInput.stratificationVariable === ''
    ? Object.keys(survival).map((key) => ({ name: key, data: survival[key] }))
    : Object.keys(survival).reduce((acc, key) => {
        const [factorKey, stratificationKey] = key.split(', ')
        const series = [{ name: factorKey, data: survival[key] }]
        const stratificationValue = acc.hasOwnProperty(stratificationKey)
          ? [...acc[stratificationKey], ...series]
          : series

        return { ...acc, [stratificationKey]: stratificationValue }
      }, {})
