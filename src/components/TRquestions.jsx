import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/tr.css'
function TRquestions() {
  const [selectedOption, setSelectedOption] = useState('');
  const [addQuestion, setAddQuestion] = useState('');
  const [addAnswer, setAddAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(true); // Show dropdown menu directly

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get("http://localhost:8080/api/subjects/getsubjects"); // Change this to your backend endpoint
        const subjectNames = response.data.map(subject => subject.subjectName);
        setOptions(subjectNames);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Error fetching options. Please try again later.");
      }
    }

    fetchOptions();
  }, []);

  async function buttonClicked() {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:8080/trquestions/post", {
        option: selectedOption,
        question: addQuestion,
        answer: addAnswer
      });

      setSelectedOption('');
      setAddQuestion('');
      setAddAnswer('');
      // Optionally, provide feedback to the user that the submission was successful
    } catch (error) {
      console.error("Error posting data:", error);
      setError("Error submitting data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (<>
    <h2 style={{color:"#BB2CD9"}}>TR questions</h2>
    <div className="trform" >
      <header className="App-header">
        <label className="trlabel">Select subject</label>
        {/* Render dropdown options */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            borderColor: '#ccc'
          }}
          disabled={isLoading}
        >
          <option value="">--None--</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label  className="trlabel">Add question</label>
        <textarea
        className="trtextarea"
          value={addQuestion}
          onChange={(e) => setAddQuestion(e.target.value)}
          placeholder="Enter Question"
        />

        <label className="trlabel">Add answer</label>
        <textarea
          className="trtextarea"
          value={addAnswer}
          onChange={(e) => setAddAnswer(e.target.value)}
          placeholder="Enter Answer"
        />
        <button
          className='submitbtn'
          onClick={buttonClicked}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div></>
  );
}

export default TRquestions;
