import React, { Fragment } from 'react'
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

const Plot = ({ data, timeInterval }) => (
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
        domain={['dataMin', 'auto']}
      />
      <YAxis
        label={{
          value: 'Survival rate',
          angle: -90,
          position: 'insideLeft',
        }}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Legend verticalAlign="top" />
      {data.map((series, i) => (
        <Line
          key={series.name}
          data={series.data}
          dataKey="prob"
          dot={false}
          name={series.name}
          type="stepAfter"
          stroke={schemeCategory10[i]}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
)

const SurvivalPlot = ({ data, stratificationVariable, timeInterval }) => (
  <div className={styles.container}>
    {data.length === 0 ? (
      <div className={styles.placeholder}>Survival plot here</div>
    ) : stratificationVariable === '' ? (
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
