import React, { useState } from 'react'
import SurvivalPlot from './SurvivalAnalysis/index'

function App() {
  const [isUsingPocMicroservice, setIsUsingPocMicroservice] = useState(false)
  const [isTestingError, setIsTestingError] = useState(false)

  const handleChange = (e) => {
    const isChecked = e.target.checked
    const url = process.env.REACT_APP_POC_MICROSERVICE_URL
    if (isChecked) {
      fetch(url, { method: 'OPTIONS' })
        .then(() => setIsUsingPocMicroservice(isChecked))
        .catch(() => alert(`Error: Microservice is not found at ${url}`))
    } else {
      setIsUsingPocMicroservice(isChecked)
    }
  }
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flex: 'flex-wrap',
          justifyContent: 'center',
        }}
      >
        <label style={{ margin: '0 .5rem' }}>
          Use POC Microservice{' '}
          <input
            type="checkbox"
            checked={isUsingPocMicroservice}
            onChange={handleChange}
          />
        </label>
        <label style={{ margin: '0 .5rem' }}>
          Test error handling{' '}
          <input
            type="checkbox"
            checked={isTestingError}
            onChange={(e) => setIsTestingError(e.target.checked)}
          />
        </label>
      </div>
      <SurvivalPlot
        isUsingPocMicroservice={isUsingPocMicroservice}
        isTestingError={isTestingError}
      />
    </>
  )
}

export default App
