import React, { useState } from 'react';
import './styles/hrQuestions.css';
import axios from 'axios';

function HRQuestions() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

  const handleChange = setter => async event => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!question.trim() || !answer.trim()) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/hrQuestions/send', { question, answer });
      console.log(response.data);
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while submitting the form');
    }
  };

  return (<>
    <h2 style={{color:"#BB2CD9"}}>HR questions</h2>

    <form onSubmit={handleSubmit} className='hrform'>
      <label>
        Question:
        <input type="text" value={question} onChange={handleChange(setQuestion)} />
      </label>
      <label>
        Answer:
        <input type="text" value={answer} onChange={handleChange(setAnswer)} />
      </label>
      {error && <p className="error">{error}</p>}
      <input type="submit" value="Submit" className='submitbutton' />
    </form></>
  );
}

export default HRQuestions;