import React, { useState } from 'react'
import SurvivalPlot from './SurvivalAnalysis/index'

function App() {
  const [isUsingPocMicroservice, setIsUsingPocMicroservice] = useState(false)
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
      <label style={{ display: 'block', textAlign: 'center' }}>
        Use POC Microservice{' '}
        <input
          type="checkbox"
          checked={isUsingPocMicroservice}
          onChange={handleChange}
        />
      </label>
      <SurvivalPlot isUsingPocMicroservice={isUsingPocMicroservice} />
    </>
  )
}

export default App
