import React, { useState } from 'react'

const styles = {
  container: {
    border: '1px solid #999',
    margin: '.5rem',
    padding: '1rem .5rem',
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

const ControlFormSelect = ({ label, options, ...selectAttrs }) => (
  <div style={styles.inputContainer.container}>
    <label style={styles.inputContainer.label}>{label}</label>
    <div style={styles.inputContainer.input}>
      <select style={styles.field} {...selectAttrs}>
        <option value="">--Please choose an option--</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  </div>
)

const ControlForm = ({ factors, onSubmit }) => {
  const [treatment, setTreatment] = useState('')
  const [confounder, setConfounder] = useState('')

  return (
    <div style={styles.container}>
      <h1>Select factors</h1>
      <form>
        <ControlFormSelect
          label="Treatment"
          options={factors}
          onChange={(e) => {
            if (e.target.value === '') setConfounder('')
            setTreatment(e.target.value)
          }}
          value={treatment}
        />
        <ControlFormSelect
          label="Confounder"
          options={factors.filter(({ value }) => value !== treatment)}
          disabled={treatment === ''}
          onChange={(e) => setConfounder(e.target.value)}
          value={confounder}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmit({ treatment, confounder })
          }}
        >
          Apply
        </button>
      </form>
    </div>
  )
}

export default ControlForm
