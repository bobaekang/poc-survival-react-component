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

const isStratified = (data) => data[0].name.split(',').length > 1

const RiskTable = ({ data, timeInterval }) => (
  <div className={styles.container}>
    <h1>risk table here</h1>
    {data.length === 0 ? (
      <div className={styles.placeholder}>Rist table here</div>
    ) : (
      <ResponsiveContainer
        className={styles.risktable}
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
            data={data
              .flatMap(({ name, data }) => data.map((d) => ({ name, ...d })))
              .filter(({ time }) => time % timeInterval === 0)}
            fill="transparent"
          >
            <LabelList dataKey="nrisk" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    )}
  </div>
)

export default RiskTable
