import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MCQComponent.css'; // Import CSS file

const MCQComponent = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setanswer] = useState('Select');
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState(null); // Define the error state variable

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get("http://localhost:8080/api/subjects/getsubjects"); // Change this to your backend endpoint
        const subjectNames = response.data.map(subject => subject.subjectName);
        setSubjects(subjectNames);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Error fetching options. Please try again later.");
      }
    }

    fetchOptions();
  }, []);


  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (e, index) => {
    switch(index){
      case 0: setOption1(e.target.value)
      break;
      case 1: setOption2(e.target.value)
      break;
      case 2: setOption3(e.target.value)
      break;
      case 3: setOption4(e.target.value)
      break;
    }
  };

  const handleanswerChange = (e) => {
    setanswer("option" + String(Number(e.target.value) + 1));
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMCQ = {
      subject: selectedSubject,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      explanation
    };
    submitMCQToServer(newMCQ);
  };

  const submitMCQToServer = (mcq) => {
    console.log(mcq)
    fetch('http://localhost:8080/api/admin/mcq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mcq)
    })
    .then(response => {
      if (response.ok) {
        console.log('MCQ submitted successfully');

        setSelectedSubject('');
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setanswer('Select');
        setExplanation('');
      } else {
        console.error('Failed to submit MCQ');
      }
    })
    .catch(error => console.error('Error submitting MCQ:', error));
  };

  return (
    <>
        <h2 style={{color:"#BB2CD9"}}>MCQ questions</h2>
       
    <div className="mcq-container"> {/* Apply styling to this container */}
      <form onSubmit={handleSubmit}>
        <select value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">Choose subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <textarea value={question} onChange={handleQuestionChange} placeholder="Enter your question" />
        <div className='mcqoption'>
          <input key={0} type="text" value={option1} onChange={(e) => handleChoiceChange(e, 0)} placeholder={`Option ${1}`} />
          <input key={1} type="text" value={option2} onChange={(e) => handleChoiceChange(e, 1)} placeholder={`Option ${2}`} />
          <input key={2} type="text" value={option3} onChange={(e) => handleChoiceChange(e, 2)} placeholder={`Option ${3}`} />
          <input key={3} type="text" value={option4} onChange={(e) => handleChoiceChange(e, 3)} placeholder={`Option ${4}`} />
          </div>
          <div>
          <label className='correctanswer'>
            Correct Choice:
            <select value={answer === null ? '' : answer} onChange={handleanswerChange}>
              <option value="">{answer}</option>
                <option key={0} value={0}> {`Option ${1}`} </option>
                <option key={1} value={1}> {`Option ${2}`} </option>
                <option key={2} value={2}> {`Option ${3}`} </option>
                <option key={3} value={3}> {`Option ${4}`} </option>
            </select>
          </label>
        </div>
        <textarea value={explanation} onChange={handleExplanationChange} placeholder="Add explanation for correct answer" />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if error occurs */}
      </form>
    </div>
    </>
  );
};

export default MCQComponent;
