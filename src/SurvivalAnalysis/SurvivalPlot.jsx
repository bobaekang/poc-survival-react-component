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

const styles = {
  container: {
    minHeight: '300px',
    padding: '.5rem',
    textAlign: 'center',
  },
  plotContainer: {
    display: 'flex',
    height: '100%',
    width: '75%',
    margin: 'auto',
  },
}

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

const SurvivalPlot = ({ data, timeInterval }) => {
  return (
    <div style={styles.container}>
      <h1>survival plot here</h1>
      {Array.isArray(data)
        ? data.length > 0 && <Plot data={data} timeInterval={timeInterval} />
        : Object.keys(data).map((key) => (
            <Fragment key={key}>
              <h2 style={{ fontSize: '1rem' }}>{key}</h2>
              <Plot data={data[key]} timeInterval={timeInterval} />
            </Fragment>
          ))}
    </div>
  )
}

export default SurvivalPlot
