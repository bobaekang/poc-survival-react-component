import React from 'react'
import ControlForm from './ControlForm'
import RiskTable from './RiskTable'
import SurvivalPlot from './SurvivalPlot'

const SurvivalAnalysis = () => {
  return (
    <>
      <ControlForm />
      <SurvivalPlot />
      <RiskTable />
    </>
  )
}

export default SurvivalAnalysis
