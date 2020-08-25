import React, { useState, useEffect } from 'react'

const styles = {
  container: {
    padding: '.5rem',
    textAlign: 'center',
    width: '100%',
  },
  inputContainer: {
    container: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: '.5rem',
    },
    label: {
      margin: '.5rem',
    },
    input: {
      margin: '.5rem',
      minWidth: '200px',
    },
  },
  field: {
    width: '100%',
  },
}

const ControlFormField = ({ label, input }) => (
  <div style={styles.inputContainer.container}>
    <label style={styles.inputContainer.label}>{label}</label>
    <div style={styles.inputContainer.input}>{input}</div>
  </div>
)

const ControlFormSelect = ({ label, options, ...selectAttrs }) => (
  <ControlFormField
    label={label}
    input={
      <select style={styles.field} {...selectAttrs}>
        <option value="">--Please choose an option--</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    }
  />
)

const ControlFormInput = ({ label, ...inputAttrs }) => (
  <ControlFormField
    label={label}
    input={<input style={styles.field} {...inputAttrs} />}
  />
)

const isUsingPocMicroservice =
  process.env.REACT_APP_POC_MICROSERVICE_URL &&
  process.env.REACT_APP_POC_MICROSERVICE_URL !== ''

const ControlForm = ({ factors, onSubmit, timeInterval }) => {
  const [factorVariable, setFactorVariable] = useState('')
  const [stratificationVariable, setStratificationVariable] = useState('')
  const [localTimeInterval, setLocalTimeInterval] = useState(timeInterval)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(10)
  const [efsFlag, setEfsFlag] = useState(false)

  useEffect(() => {
    onSubmit({
      factorVariable,
      stratificationVariable,
      timeInterval: localTimeInterval,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={styles.container}>
      <h1>Select variables</h1>
      <form>
        <ControlFormSelect
          label="Factor variable"
          options={factors}
          onChange={(e) => {
            if (
              e.target.value === '' ||
              e.target.value === stratificationVariable
            )
              setStratificationVariable('')

            setFactorVariable(e.target.value)
          }}
          value={factorVariable}
        />
        <ControlFormSelect
          label="Stratification variable"
          options={factors.filter(({ value }) => value !== factorVariable)}
          disabled={factorVariable === ''}
          onChange={(e) => setStratificationVariable(e.target.value)}
          value={stratificationVariable}
        />
        <ControlFormInput
          label="Time interval (1 to 5)"
          type="number"
          min={1}
          max={5}
          step={1}
          onChange={(e) =>
            setLocalTimeInterval(Number.parseInt(e.target.value))
          }
          value={localTimeInterval}
        />
        {isUsingPocMicroservice && (
          <>
            <ControlFormInput
              label="Start time"
              type="number"
              min={0}
              max={endTime - 1}
              step={1}
              onChange={(e) => setStartTime(Number.parseInt(e.target.value))}
              value={startTime}
            />
            <ControlFormInput
              label="End time"
              type="number"
              min={startTime + 1}
              max={99}
              step={1}
              onChange={(e) => setEndTime(Number.parseInt(e.target.value))}
              value={endTime}
            />
            <ControlFormInput
              label="EFS flag"
              type="checkbox"
              onChange={(e) => setEfsFlag(Number.parseInt(e.target.value))}
              value={efsFlag}
            />
          </>
        )}

        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmit({
              factorVariable,
              stratificationVariable,
              timeInterval: localTimeInterval,
            })
          }}
        >
          Apply
        </button>
      </form>
    </div>
  )
}

export default ControlForm
