import React from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'
import { factors } from '../mockData'

const styles = {
  container: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
  },
  columnLeft: {
    display: 'flex',
    minWidth: '33%',
  },
  columnRight: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50%',
  },
}

const SurvivalAnalysis = () => {
  const handleSubmit = (userInput) => {
    console.log('user input', userInput)
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
