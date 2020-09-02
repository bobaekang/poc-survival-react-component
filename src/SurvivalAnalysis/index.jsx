import React, { useState } from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'
import { factors } from '../mockData'
import { fetchSurvivalResult } from './utils'
import styles from './SurvivalAnalysis.module.css'
import './typedef'

/**
 * @param {Object} prop
 * @param {boolean} prop.isUsingPocMicroservice
 */
const SurvivalAnalysis = ({ isUsingPocMicroservice }) => {
  const [pval, setPval] = useState()
  const [risktable, setRisktable] = useState([])
  const [survival, setSurvival] = useState([])
  const [stratificationVariable, setStratificationVariable] = useState('')
  const [timeInterval, setTimeInterval] = useState(2)
  /**
   * @type {UserInputSubmitHandler}
   */
  const handleSubmit = (userInput) => {
    setStratificationVariable(userInput.stratificationVariable)
    setTimeInterval(userInput.timeInterval)

    fetchSurvivalResult(isUsingPocMicroservice)(userInput).then((result) => {
      setPval(result.pval && +parseFloat(result.pval).toFixed(4))
      setRisktable(result.risktable)
      setSurvival(result.survival)
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
          {pval && `Log-rank test p-value: ${pval}`}
        </div>
        <SurvivalPlot
          data={survival}
          stratificationVariable={stratificationVariable}
          timeInterval={timeInterval}
        />
        <RiskTable data={risktable} timeInterval={timeInterval} />
      </div>
    </div>
  )
}

export default SurvivalAnalysis
