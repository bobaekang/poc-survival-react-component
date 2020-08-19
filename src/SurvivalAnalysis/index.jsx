import React, { useState } from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'
import { factors } from '../mockData'
import { fetchSurvivalResult, getSurvivalSeries } from './utils'
import styles from './SurvivalAnalysis.module.css'

const SurvivalAnalysis = () => {
  const [survivalSeries, setSurvivalSeries] = useState([])
  const handleSubmit = (userInput) => {
    console.log('user input', userInput)
    fetchSurvivalResult(userInput).then((result) => {
      console.log('result', result)
      setSurvivalSeries(getSurvivalSeries(result.survival, userInput))
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <ControlForm factors={factors} onSubmit={handleSubmit} />
      </div>
      <div className={styles.columnRight}>
        <SurvivalPlot />
        <RiskTable />
      </div>
    </div>
  )
}

export default SurvivalAnalysis
