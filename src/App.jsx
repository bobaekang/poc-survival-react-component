import React, { useState } from 'react'
import SurvivalPlot from './SurvivalAnalysis/index'

function App() {
  const [isUsingPocMicroservice, setIsUsingPocMicroservice] = useState(false)
  return (
    <>
      <label style={{ display: 'block', textAlign: 'center' }}>
        Use POC Microservice{' '}
        <input
          type="checkbox"
          checked={isUsingPocMicroservice}
          onChange={(e) => setIsUsingPocMicroservice(e.target.checked)}
        />
      </label>
      <SurvivalPlot isUsingPocMicroservice={isUsingPocMicroservice} />
    </>
  )
}

export default App
