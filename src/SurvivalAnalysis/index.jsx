import React from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'
import { factors, result } from '../mockData'

const styles = {
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '12px',
  },
  columnLeft: {
    display: 'flex',
    flexGrow: 1,
  },
  columnRight: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
  },
}

const fetchSurvivalResult = ({ factorVariable, stratificationVariable }) =>
  Promise.resolve(
    result[
      factorVariable
        ? stratificationVariable
          ? `${factorVariable}_${stratificationVariable}`.toLowerCase()
          : factorVariable.toLowerCase()
        : 'all'
    ]
  )

const SurvivalAnalysis = () => {
  const handleSubmit = (userInput) => {
    console.log('user input', userInput)
    fetchSurvivalResult(userInput).then((result) =>
      console.log('result', result)
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.columnLeft}>
        <ControlForm factors={factors} onSubmit={handleSubmit} />
      </div>
      <div style={styles.columnRight}>
        <SurvivalPlot />
        <RiskTable />
      </div>
    </div>
  )
}

export default SurvivalAnalysis
