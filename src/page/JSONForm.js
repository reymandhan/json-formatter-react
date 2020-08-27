import React from 'react'

function JSONForm(props) {
  return (
    <div>
      <textarea
        name="message"
        rows="50"
        cols="150"
        onChange={(e) => props.setInput(e.target.value)}
        value={props.input}
      />
    </div>
  )
}

export default JSONForm
