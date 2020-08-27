import React, { useState, useRef, useEffect } from 'react'

function JSONTree(props) {
  function getNode(obj) {
    const arr = []
    Object.keys(obj).forEach((key) => {
      arr.push({ value: obj[key], nodeKey: key })
    })
    return arr
  }

  const root = getNode(props.jsonObj)

  return (
    <div className="tree">
      <p>{'object {' + root.length + '}'}</p>
      {root.map((data) => (
        <TreeNode
          key={data.nodeKey}
          propKey={data.nodeKey}
          nodeKey={data.nodeKey}
          node={data.value}
          getNode={getNode}
          level={1}
          handleChange={props.handleChange}
        />
      ))}
    </div>
  )
}

function TreeNode(props) {
  const [display, setDisplay] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const inputRef = useRef(null)

  const { node, nodeKey, level, handleChange, propKey } = props

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEdit])

  if (typeof node === 'string' || typeof node === 'number' || node === null) {
    return (
      <React.Fragment>
        <p style={{ marginLeft: level * 10 + 'px' }}>
          <span
            onMouseEnter={() => {
              setIsEdit(true)
            }}
            onMouseLeave={() => {
              setIsEdit(false)
            }}
          >
            {nodeKey}:&nbsp;
            {!isEdit && (node ? node : 'null')}
            {isEdit && (
              <input
                ref={inputRef}
                value={node ? node : ''}
                name={propKey}
                onChange={(e) => handleChange(e)}
              />
            )}
          </span>
        </p>
      </React.Fragment>
    )
  } else if (typeof node === 'boolean') {
    return (
      <React.Fragment>
        <p style={{ marginLeft: level * 10 + 'px' }}>
          <span
            onMouseEnter={() => {
              setIsEdit(true)
            }}
            onMouseLeave={() => {
              setIsEdit(false)
            }}
          >
            {nodeKey}:&nbsp;
            {!isEdit && node.toString()}
            {isEdit && (
              <label>
                <input
                  type="checkbox"
                  checked={node}
                  name={propKey}
                  onChange={(e) => handleChange(e)}
                />
                {node.toString()}
              </label>
            )}
          </span>
        </p>
      </React.Fragment>
    )
  } else if (
    typeof node === 'object' &&
    !Array.isArray(node) &&
    node !== null
  ) {
    const root = props.getNode(node)

    return (
      <React.Fragment>
        <p style={{ marginLeft: level * 10 + 'px' }}>
          <span
            className={'caret ' + (display ? 'caret-down' : '')}
            onClick={() => setDisplay(!display)}
          >
            {nodeKey}
            {'{' + root.length + '}'}: {'{'}
          </span>
        </p>
        {display &&
          root.map((data) => (
            <TreeNode
              key={propKey + '[' + data.nodeKey + ']'}
              propKey={propKey + '[' + data.nodeKey + ']'}
              nodeKey={data.nodeKey}
              node={data.value}
              getNode={props.getNode}
              level={level + 1}
              handleChange={handleChange}
            />
          ))}{' '}
        <p style={{ marginLeft: level * 10 + 'px' }}> {'}'} </p>
      </React.Fragment>
    )
  } else if (Array.isArray(node)) {
    const root = props.getNode(node)
    return (
      <React.Fragment>
        <p style={{ marginLeft: level * 10 + 'px' }}>
          <span
            className={'caret ' + (display ? 'caret-down' : '')}
            onClick={() => setDisplay(!display)}
          >
            {nodeKey}
            {'[' + root.length + ']'}: {'['}
          </span>
        </p>
        {display &&
          root.map((data) => (
            <TreeNode
              key={propKey + '[' + data.nodeKey + ']'}
              propKey={propKey + '[' + data.nodeKey + ']'}
              nodeKey={data.nodeKey}
              node={data.value}
              getNode={props.getNode}
              level={level + 1}
              handleChange={handleChange}
            />
          ))}
        <p style={{ marginLeft: level * 10 + 'px' }}>{']'}</p>
      </React.Fragment>
    )
  } else {
    return <p>{nodeKey}</p>
  }
}

export default JSONTree
