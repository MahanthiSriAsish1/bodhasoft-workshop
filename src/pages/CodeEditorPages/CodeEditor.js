import React from 'react'
import Options from '../../Components/Editor components/Options'
import codeEditor from '../../Components/Editor components/CodeEditor'

const CodeEditor = () => {
  return (
    <div className='editorParent'>
      {/* <Options/> */}
      <codeEditor />
    </div>
  )
}

export default CodeEditor