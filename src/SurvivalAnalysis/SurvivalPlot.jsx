import React, { Fragment, useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { getXAxisTicks } from './utils'
import styles from './SurvivalPlot.module.css'
import './typedef'

/**
 * @param {Object} prop
 * @param {SurvivalData[]} prop.data
 * @param {number} prop.timeInterval
 */
const Plot = ({ data, timeInterval }) => {
  const [opacity, setOpacity] = useState({})
  useEffect(() => {
    const initOpacity = {}
    for (const { name } of data) initOpacity[name] = 1
    setOpacity(initOpacity)
  }, [data])

  function handleLegendMouseEnter({ value: lineName }) {
    const newOpacity = { ...opacity }
    for (const name in newOpacity)
      newOpacity[name] = name === lineName ? 1 : 0.1
    setOpacity(newOpacity)
  }

  function handleLegendMouseLeave({ value: lineName }) {
    const newOpacity = { ...opacity }
    for (const name in newOpacity) if (name !== lineName) newOpacity[name] = 1
    setOpacity(newOpacity)
  }

  return (
    <ResponsiveContainer height={300}>
      <LineChart data={data} margin={{ left: 20, bottom: 10, right: 20 }}>
        <XAxis
          dataKey="time"
          type="number"
          label={{
            value: 'Time (in year)',
            position: 'insideBottom',
            offset: -5,
          }}
          ticks={getXAxisTicks(data, timeInterval)}
          domain={['dataMin', (dataMax) => Math.ceil(dataMax)]}
        />
        <YAxis
          label={{
            value: 'Survival rate',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend
          verticalAlign="top"
          onMouseEnter={handleLegendMouseEnter}
          onMouseLeave={handleLegendMouseLeave}
        />
        {data.map((series, i) => (
          <Line
            key={series.name}
            data={series.data}
            dataKey="prob"
            dot={false}
            name={series.name}
            type="stepAfter"
            stroke={schemeCategory10[i]}
            strokeOpacity={opacity[series.name]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

/**
 * @param {Object} prop
 * @param {SurvivalData[]} prop.data
 * @param {boolean} prop.isStratified
 * @param {number} prop.timeInterval
 */
const SurvivalPlot = ({ data, isStratified, timeInterval }) => (
  <div className={styles.container}>
    {data.length === 0 ? (
      <div className={styles.placeholder}>Survival plot here</div>
    ) : isStratified ? (
      <Plot data={data} timeInterval={timeInterval} />
    ) : (
      Object.entries(
        data.reduce((acc, { name, data }) => {
          const [factorKey, stratificationKey] = name.split(',')
          const stratificationValue = acc.hasOwnProperty(stratificationKey)
            ? [...acc[stratificationKey], { name: factorKey, data }]
            : [{ name: factorKey, data }]

          return { ...acc, [stratificationKey]: stratificationValue }
        }, {})
      ).map(([key, data]) => (
        <Fragment key={key}>
          <h2 style={{ fontSize: '1rem' }}>{key}</h2>
          <Plot data={data} timeInterval={timeInterval} />
        </Fragment>
      ))
    )}
  </div>
)

export default SurvivalPlot
