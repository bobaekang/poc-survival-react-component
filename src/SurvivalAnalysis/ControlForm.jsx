import React, { useState, useEffect } from 'react'
import styles from './ControlForm.module.css'
import './typedef'

/**
 * @param {Object} prop
 * @param {string} prop.label
 * @param {JSX.Element} prop.input
 */
const ControlFormField = ({ label, input }) => (
  <div className={styles.fieldContainer}>
    <label className={styles.fieldLabel}>{label}</label>
    <div className={styles.fieldInput}>{input}</div>
  </div>
)

const ControlFormSelect = ({
  label,
  options,
  hideDefaultOption,
  ...selectAttrs
}) => (
  <ControlFormField
    label={label}
    input={
      <select className={styles.input} {...selectAttrs}>
        {hideDefaultOption || (
          <option value="">--Please choose an option--</option>
        )}
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
    input={<input className={styles.input} {...inputAttrs} />}
  />
)

/**
 * @param {Object} prop
 * @param {string[]} prop.factors
 * @param {UserInputSubmitHandler} prop.onSubmit
 * @param {number} prop.timeInterval
 * @param {boolean} prop.isUsingPocMicroservice
 */
const ControlForm = ({
  factors,
  onSubmit,
  timeInterval,
  isUsingPocMicroservice,
}) => {
  const [factorVariable, setFactorVariable] = useState('')
  const [stratificationVariable, setStratificationVariable] = useState('')
  const [localTimeInterval, setLocalTimeInterval] = useState(timeInterval)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(20)
  const [survivalType, setSurvivalType] = useState('all')

  const [isInputChanged, setIsInputChanged] = useState(false)
  useEffect(() => {
    setIsInputChanged(true)
  }, [
    factorVariable,
    stratificationVariable,
    localTimeInterval,
    startTime,
    endTime,
    survivalType,
  ])

  /**
   * @param {{ target: { value: string, min: string, max: string }}} e
   */
  const validateNumberInput = (e) => {
    const value = Number.parseInt(e.target.value)
    const min = Number.parseInt(e.target.min)
    const max = Number.parseInt(e.target.max)
    if (min && min > value) setLocalTimeInterval(min)
    else if (max && max < value) setLocalTimeInterval(max)
  }

  const submitUserInput = () =>
    onSubmit({
      factorVariable,
      stratificationVariable,
      timeInterval: localTimeInterval,
      ...(isUsingPocMicroservice
        ? { startTime, endTime, efsFlag: survivalType === 'efs' }
        : {}),
    })
  useEffect(() => {
    submitUserInput()
  }, [isUsingPocMicroservice]) // eslint-disable-line react-hooks/exhaustive-deps

  const resetUserInput = () => {
    setFactorVariable('')
    setStratificationVariable('')
    setLocalTimeInterval(2)
    setStartTime(0)
    setEndTime(20)
    setSurvivalType('all')
  }

  return (
    <div className={styles.container}>
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
          onBlur={validateNumberInput}
          onChange={(e) =>
            setLocalTimeInterval(Number.parseInt(e.target.value))
          }
          value={localTimeInterval}
        />
        {isUsingPocMicroservice && (
          <>
            <ControlFormInput
              label="Start time (year)"
              type="number"
              min={0}
              max={endTime - 1}
              step={1}
              onBlur={validateNumberInput}
              onChange={(e) => setStartTime(Number.parseInt(e.target.value))}
              value={startTime}
            />
            <ControlFormInput
              label="End time (year)"
              type="number"
              min={startTime + 1}
              max={99}
              step={1}
              onBlur={validateNumberInput}
              onChange={(e) => setEndTime(Number.parseInt(e.target.value))}
              value={endTime}
            />
            <ControlFormSelect
              label="Survival type"
              options={[
                { label: 'All Survival', value: 'all' },
                { label: 'Event-Free Survival (EFS)', value: 'efs' },
              ]}
              hideDefaultOption
              onChange={(e) => setSurvivalType(e.target.value)}
              value={survivalType}
            />
          </>
        )}
        <div className={styles.buttonContainer}>
          <button
            onClick={(e) => {
              e.preventDefault()
              submitUserInput()
              setIsInputChanged(false)
            }}
            disabled={!isInputChanged}
          >
            Apply
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              resetUserInput()
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default ControlForm
