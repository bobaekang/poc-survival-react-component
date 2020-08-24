import React, { useState } from 'react'

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

const ControlForm = ({ factors, onSubmit }) => {
  const [factorVariable, setFactorVariable] = useState('')
  const [stratificationVariable, setStratificationVariable] = useState('')

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
        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmit({ factorVariable, stratificationVariable })
          }}
        >
          Apply
        </button>
      </form>
    </div>
  )
}

export default ControlForm
