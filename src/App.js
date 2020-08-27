import React, { useState, useEffect } from 'react'
import './App.css'
import { JSONForm, JSONTree } from './page'
import _ from 'lodash'

function App() {
  const [input, setInput] = useState('')
  const [jsonObj, setJsonObj] = useState(null)
  const [mode, setMode] = useState('code')

  function handleSubmit(input) {
    try {
      setJsonObj(JSON.parse(input))
    } catch {
      alert('incorrect JSON format')
    }
  }

  function handleToggle(value) {
    handleSubmit(input)
    setMode(value)
  }

  function handleChange(e) {
    const name = e.target.name
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const temp = JSON.parse(JSON.stringify(jsonObj))

    setJsonObj(_.set(temp, name, value))
  }

  useEffect(() => {
    if (jsonObj) {
      setInput(JSON.stringify(jsonObj, null, '  '))
    }
  }, [jsonObj])

  return (
    <div className="App">
      <header className="App-header">
        <div className="btn-group">
          <button onClick={() => handleToggle('code')}>Code</button>
          <button onClick={() => handleToggle('tree')}>Tree</button>
        </div>
        <button onClick={() => handleSubmit(input)}>Format</button>
        {mode === 'code' && <JSONForm input={input} setInput={setInput} />}
        {mode === 'tree' && (
          <JSONTree jsonObj={jsonObj} handleChange={handleChange} />
        )}
      </header>
    </div>
  )
}

export default App
