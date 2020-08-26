import React, { useState } from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'
import { factors } from '../mockData'
import { fetchSurvivalResult, getSurvivalSeries } from './utils'
import styles from './SurvivalAnalysis.module.css'

const SurvivalAnalysis = ({ isUsingPocMicroservice }) => {
  const [survivalSeries, setSurvivalSeries] = useState([])
  const [risktable, setRisktable] = useState([])
  const [pval, setPval] = useState()
  const [timeInterval, setTimeInterval] = useState(2)
  const handleSubmit = (userInput) => {
    setTimeInterval(userInput.timeInterval)

    fetchSurvivalResult(isUsingPocMicroservice)(userInput).then((result) => {
      setSurvivalSeries(getSurvivalSeries(result.survival, userInput))
      setRisktable(result.risktable)
      setPval(result.pval)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <ControlForm
          factors={factors}
          onSubmit={handleSubmit}
          timeInterval={timeInterval}
          isUsingPocMicroservice={isUsingPocMicroservice}
        />
      </div>
      <div className={styles.columnRight}>
        <div className={styles.pval}>
          {pval && `Log-rank test p-value: ${+parseFloat(pval).toFixed(4)}`}
        </div>
        <SurvivalPlot data={survivalSeries} timeInterval={timeInterval} />
        <RiskTable data={risktable} timeInterval={timeInterval} />
      </div>
    </div>
  )
}

export default SurvivalAnalysis
