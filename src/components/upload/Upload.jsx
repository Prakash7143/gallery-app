import React, { useState } from 'react'
import Form from './Form'
import ProgressList from './progressList/ProgressList'

const Upload = () => {
  const [files, setFiles] = useState([]);
    
  return (
    <div style={{marginBottom:"2rem"}}>
      <Form setFiles={setFiles} />
      <ProgressList files={files}/>
    </div>
  )
}

export default Upload