import React, { useState } from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'
import { factors } from '../mockData'
import { fetchSurvivalResult, getSurvivalSeries } from './utils'
import styles from './SurvivalAnalysis.module.css'

const SurvivalAnalysis = () => {
  const [survivalSeries, setSurvivalSeries] = useState([])
  const [risktable, setRisktable] = useState([])
  const [timeInterval, setTimeInterval] = useState(2)
  const handleSubmit = (userInput) => {
    setTimeInterval(userInput.timeInterval)

    fetchSurvivalResult(userInput).then((result) => {
      setSurvivalSeries(getSurvivalSeries(result.survival, userInput))
      setRisktable(result.risktable)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <ControlForm
          factors={factors}
          onSubmit={handleSubmit}
          timeInterval={timeInterval}
        />
      </div>
      <div className={styles.columnRight}>
        <SurvivalPlot data={survivalSeries} timeInterval={timeInterval} />
        <RiskTable data={risktable} timeInterval={timeInterval} />
      </div>
    </div>
  )
}

export default SurvivalAnalysis
