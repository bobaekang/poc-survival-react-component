import React, { Fragment } from 'react'
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
const Table = ({ data, isLast, timeInterval }) => (
  <ResponsiveContainer
    className="risktable"
    height={(data.length + (isLast ? 2 : 0.5)) * 30}
  >
    <ScatterChart
      margin={{
        bottom: isLast ? 10 : 0,
        left: 20,
        right: 20,
      }}
    >
      <XAxis
        dataKey="time"
        type="number"
        domain={['dataMin', getMaxTime(data)]}
        hide={!isLast}
        label={
          isLast
            ? { value: 'Time (in year)', position: 'insideBottom', offset: -5 }
            : {}
        }
        ticks={getXAxisTicks(data, timeInterval)}
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
      <Scatter data={parseRisktable(data, timeInterval)} fill="transparent">
        <LabelList dataKey="nrisk" />
      </Scatter>
    </ScatterChart>
  </ResponsiveContainer>
)

/**
 * @param {Object} prop
 * @param {RisktableData[]} prop.data
 * @param {string} prop.stratificationVariable
 * @param {number} prop.timeInterval
 */
const RiskTable = ({ data, stratificationVariable, timeInterval }) => (
  <div className={styles.container}>
    {data.length === 0 ? (
      <div className={styles.placeholder}>Rist table here</div>
    ) : (
      <>
        <span style={{ marginLeft: '1rem' }}># at risk</span>
        {stratificationVariable === '' ? (
          <Table data={data} timeInterval={timeInterval} isLast />
        ) : (
          Object.entries(
            data.reduce((acc, { name, data }) => {
              const [factorKey, stratificationKey] = name.split(',')
              const stratificationValue = acc.hasOwnProperty(stratificationKey)
                ? [...acc[stratificationKey], { name: factorKey, data }]
                : [{ name: factorKey, data }]

              return { ...acc, [stratificationKey]: stratificationValue }
            }, {})
          ).map(([key, data], i, arr) => (
            <Fragment key={key}>
              <h2 style={{ fontSize: '1rem' }}>{key}</h2>
              <Table
                data={data}
                timeInterval={timeInterval}
                isLast={i === arr.length - 1}
              />
            </Fragment>
          ))
        )}
      </>
    )}
  </div>
)

export default RiskTable
