import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../Dashboard/BodhaSoft_logo_purple-removebg.png';
import { MdHome, MdTimer } from 'react-icons/md';
import { MDBBtn, MDBCollapse, MDBIcon } from 'mdb-react-ui-kit';
import './TRtestpage.css';
import { BsClock } from 'react-icons/bs';
import { PiTimerBold } from 'react-icons/pi';

const Mcqquestions = () => {
  // Placeholder instructions for structure
  const placeholderInstructions = [
    "1. Read each question carefully.",
    "2. Type your answers in the provided text area.",
    "3. Navigate between questions using the 'Previous' and 'Next' buttons.",
    "4. Mark questions for review if needed.",
    "5. Click 'Submit' on the last question to finish the test."
  ];

  const initialQuestions = [
    { scenario: 'Write a function to reverse a string in JavaScript.' },
    { scenario: 'How do you sort an array of numbers in Python?' },
    { scenario: 'Implement a binary search algorithm in Java.' },
    { scenario: 'Write a SQL query to find all employees in a specific department.' },
    { scenario: 'Write a function to check if a number is prime in C.' },
    { scenario: 'How do you implement a stack using an array in JavaScript?' },
    { scenario: 'Write a shell script to count the number of lines in a file.' },
    { scenario: 'How do you find the maximum value in an array using Python?' },
    { scenario: 'Write a function to merge two sorted arrays in C++.' },
    { scenario: 'Implement a basic HTTP server in Node.js.' }
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [instructions, setInstructions] = useState(placeholderInstructions);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(initialQuestions.length).fill(''));
  const [submitted, setSubmitted] = useState(Array(initialQuestions.length).fill(false));
  const [markedForReview, setMarkedForReview] = useState(Array(initialQuestions.length).fill(false));
  const [viewedQuestions, setViewedQuestions] = useState(Array(initialQuestions.length).fill(false));
  const [showTerminal, setShowTerminal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Fetch questions and instructions from the API
  useEffect(() => {
    const fetchQuestionsAndInstructions = async () => {
      try {
        const [questionsResponse, instructionsResponse] = await Promise.all([
          axios.get('/api/mcq-questions'),
          axios.get('/api/instructions')
        ]);
        setQuestions(questionsResponse.data);
        setInstructions(instructionsResponse.data || placeholderInstructions); // Fallback to placeholder instructions if API fails
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setInstructions(placeholderInstructions); // Use placeholder instructions in case of an error
      }
    };

    fetchQuestionsAndInstructions();
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setShowTerminal(false);
    const updatedViewedQuestions = [...viewedQuestions];
    updatedViewedQuestions[index] = true;
    setViewedQuestions(updatedViewedQuestions);
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[selectedQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const updatedSubmitted = [...submitted];
    updatedSubmitted[selectedQuestion] = true;
    setSubmitted(updatedSubmitted);
    handleNextQuestion();
  };

  const handleMarkForReview = () => {
    const updatedMarkedForReview = [...markedForReview];
    updatedMarkedForReview[selectedQuestion] = !updatedMarkedForReview[selectedQuestion];
    setMarkedForReview(updatedMarkedForReview);
  };

  const handleNextQuestion = () => {
    const updatedViewedQuestions = [...viewedQuestions];
    if (answers[selectedQuestion] === '' && !markedForReview[selectedQuestion]) {
      updatedViewedQuestions[selectedQuestion] = true;
    }
    setViewedQuestions(updatedViewedQuestions);
    setSelectedQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setShowTerminal(false);
  };

  const handlePreviousQuestion = () => {
    setSelectedQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    setShowTerminal(false);
  };

  const handleFinalSubmit = () => {
    // Logic for final submission, e.g., sending data to server or displaying results
    console.log('Final Submission:', answers);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleStartTest = () => {
    setShowInstructions(false);
  };

  return (
    <>
      <div className='navbar'>
        <img src={logo} className='logo' alt="Logo" />
        <p className='timer'> <PiTimerBold /> 
        {/* timmer logic here */}
        00:30:00</p>
      </div>

      {showInstructions ? (
        <div className="instructions-container">
         
          <h3 className='instructionhead'>Welcome to the test! Please follow the instructions below</h3>
          
          <div className='instructions'>
          <h1 style={{color:'blueviolet'}}>Instructions</h1>
          {instructions.map((instruction, index) => (
            <p key={index}>{instruction}</p>
          ))}
          <center>
          <MDBBtn onClick={handleStartTest} style={{ backgroundColor: "blueviolet", padding: "10px 20px", fontSize: "18px" }}>
            Start Test
          </MDBBtn></center>
          </div>
        </div>
      ) : (
        <div className="test-container">
          <MDBCollapse open={isSidebarOpen}>
            <div className="sidebar">
             
              <div className='qnumber'>

              {questions.map((_, index) => (
                <div 
                  key={index}
                  className={`question-tab 
                            ${submitted[index] ? 'submitted' : markedForReview[index] ? 'review' : viewedQuestions[index] && answers[index] === '' ? 'not-answered' : ''}
                            ${selectedQuestion === index ? 'active' : ''}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {`Q${index + 1}`}
                  </div>
               
              ))}
               </div>
            </div>
          </MDBCollapse>
          <div className="main-content">
            {questions.length > 0 && (
              <>
                <div className="question-info">
                  <MDBBtn onClick={toggleSidebar} style={{ backgroundColor: "blueviolet", padding: "5px 10px", fontSize: "20px" }}>
                    <MDBIcon fas icon="bars" />
                  </MDBBtn><br />
                  <strong>Question {selectedQuestion + 1}</strong>
                  <p className='question-text'>{questions[selectedQuestion].scenario}</p>
                </div>
                <div className="editor-container">
                  <div className="answer-area">
                    <textarea
                      value={answers[selectedQuestion]}
                      onChange={handleAnswerChange}
                      placeholder="Type your answer here"
                      rows="4"
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div className="action-buttons" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleSubmit} className='submit-btn'>Save & Next</button>
                  </div>
                  <div className="review-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={markedForReview[selectedQuestion]}
                        onChange={handleMarkForReview}
                      />
                      Mark for review
                    </label>
                  </div>
                  <div className='navigation-buttons'>
                    <button onClick={handlePreviousQuestion} disabled={selectedQuestion === 0} className='nav-btn'>
                      Previous
                    </button>
                    {selectedQuestion === questions.length - 1 ? (
                      <button onClick={handleFinalSubmit} className='nav-btn'>
                        Submit
                      </button>
                    ) : (
                      <button onClick={handleNextQuestion} className='nav-btn'>
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Mcqquestions;