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
const SurvivalAnalysis = ({ isUsingPocMicroservice, isTestingError }) => {
  const [isError, setIsError] = useState(false)
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

    fetchSurvivalResult(isUsingPocMicroservice)({
      isTestingError,
      ...userInput,
    })
      .then((result) => {
        setIsError(false)
        setPval(result.pval && +parseFloat(result.pval).toFixed(4))
        setRisktable(result.risktable)
        setSurvival(result.survival)
      })
      .catch((e) => {
        console.error(e)
        setIsError(true)
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <ControlForm
          factors={factors}
          onSubmit={handleSubmit}
          timeInterval={timeInterval}
          isError={isError}
          isUsingPocMicroservice={isUsingPocMicroservice}
        />
      </div>
      <div className={styles.columnRight}>
        {isError ? (
          <div style={{ color: 'red', margin: 'auto' }}>
            <p>
              Something went wrong! Please retry by clicking "Apply" button.
            </p>
            <p>If the problem persists, try refreshing the page.</p>
          </div>
        ) : (
          <>
            <div className={styles.pval}>
              {pval && `Log-rank test p-value: ${pval}`}
            </div>
            <SurvivalPlot
              data={survival}
              notStratified={stratificationVariable === ''}
              timeInterval={timeInterval}
            />
            <RiskTable
              data={risktable}
              notStratified={stratificationVariable === ''}
              timeInterval={timeInterval}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default SurvivalAnalysis
