import React from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { getXAxisTicks } from './utils'
import styles from './RiskTable.module.css'
import './RiskTable.css'
import './typedef'

/**
 * @param {RisktableData[]} data
 */
const isStratified = (data) => data[0].name.split(',').length > 1

/**
 * @param {RisktableData[]} data
 * @param {number} timeInterval
 */
const parseRisktable = (data, timeInterval) => {
  const minTime = data[0].data[0].time
  return data
    .flatMap(({ name, data }) => data.map((d) => ({ name, ...d })))
    .filter(({ time }) => (time - minTime) % timeInterval === 0)
}

/**
 * @param {RisktableData[]} data
 */
const getMaxTime = (data) =>
  Math.max(...data.flatMap(({ data }) => data.map(({ time }) => time)))

/**
 * @param {Object} prop
 * @param {RisktableData[]} prop.data
 * @param {number} prop.timeInterval
 */
const RiskTable = ({ data, timeInterval }) => (
  <div className={styles.container}>
    {data.length === 0 ? (
      <div className={styles.placeholder}>Rist table here</div>
    ) : (
      <>
        <span style={{ marginLeft: '1rem' }}># at risk</span>
        <ResponsiveContainer
          className="risktable"
          height={(data.length + 2) * 30}
        >
          <ScatterChart
            margin={{
              left: isStratified(data) ? 80 : 20,
              bottom: 10,
              right: 20,
            }}
          >
            <XAxis
              dataKey="time"
              type="number"
              label={{
                value: 'Time (in year)',
                position: 'insideBottom',
                offset: -5,
              }}
              ticks={getXAxisTicks(data, timeInterval)}
              domain={['dataMin', getMaxTime(data)]}
            />
            <YAxis
              dataKey="name"
              type="category"
              allowDuplicatedCategory={false}
              axisLine={false}
              reversed
              tickSize={0}
              tick={{ dx: -20 }}
            />
            <Scatter
              data={parseRisktable(data, timeInterval)}
              fill="transparent"
            >
              <LabelList dataKey="nrisk" />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </>
    )}
  </div>
)

export default RiskTable
