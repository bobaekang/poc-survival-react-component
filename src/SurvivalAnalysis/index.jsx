import React from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'

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
  return (
    <div style={styles.container}>
      <div style={styles.columnLeft}>
        <ControlForm />
      </div>
      <div style={styles.columnRight}>
        <SurvivalPlot />
        <RiskTable />
      </div>
    </div>
  )
}

export default SurvivalAnalysis
