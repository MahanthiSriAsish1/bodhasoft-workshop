import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mcqquestion.css'
import logo from './BodhaSoft_logo_purple-removebg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdHome, MdHomeFilled } from 'react-icons/md';
import { FaCode, FaCoffee } from 'react-icons/fa';
import { VscLoading } from 'react-icons/vsc';
import { GrPowerReset } from 'react-icons/gr';
import { IoPlayOutline } from 'react-icons/io5';
import { MDBBtn, MDBCollapse, MDBIcon } from 'mdb-react-ui-kit';
import { PiTimerBold } from 'react-icons/pi';

const Questions = () => {
  // Initialize with dummy data for the questions
  const initialQuestions = [
    {
      scenario: 'Write a function to add two numbers.',
      constraints: 'The input numbers are non-negative.',
      sampleInput: 'Input: 2, 3',
      sampleOutput: 'Output: 5',
      testCases: [
        { input: '1, 2', output: '3' },
        { input: '5, 5', output: '10' },
      ],
    },
    {
      scenario: 'Write a function to subtract two numbers.',
      constraints: 'The input numbers are non-negative.',
      sampleInput: 'Input: 5, 3',
      sampleOutput: 'Output: 2',
      testCases: [
        { input: '7, 2', output: '5' },
        { input: '10, 4', output: '6' },
      ],
    },
    {
      scenario: 'Write a function to multiply two numbers.',
      constraints: 'The input numbers are non-negative.',
      sampleInput: 'Input: 2, 3',
      sampleOutput: 'Output: 6',
      testCases: [
        { input: '2, 4', output: '8' },
        { input: '3, 3', output: '9' },
      ],
    },
    {
      scenario: 'Write a function to add two numbers.',
      constraints: 'The input numbers are non-negative.',
      sampleInput: 'Input: 2, 3',
      sampleOutput: 'Output: 5',
      testCases: [
        { input: '1, 2', output: '3' },
        { input: '5, 5', output: '10' },
      ],
    },
    {
      scenario: 'Write a function to subtract two numbers.',
      constraints: 'The input numbers are non-negative.',
      sampleInput: 'Input: 5, 3',
      sampleOutput: 'Output: 2',
      testCases: [
        { input: '7, 2', output: '5' },
        { input: '10, 4', output: '6' },
      ],
    },
    {
      scenario: 'Write a function to multiply two numbers.',
      constraints: 'The input numbers are non-negative.',
      sampleInput: 'Input: 2, 3',
      sampleOutput: 'Output: 6',
      testCases: [
        { input: '2, 4', output: '8' },
        { input: '3, 3', output: '9' },
      ],
    }
  ];

  // State variables
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(initialQuestions.length).fill(''));
  const [submitted, setSubmitted] = useState(Array(initialQuestions.length).fill(false));
  const [markedForReview, setMarkedForReview] = useState(Array(initialQuestions.length).fill(false));
  const [viewedQuestions, setViewedQuestions] = useState(Array(initialQuestions.length).fill(false));
  const [showTerminal, setShowTerminal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        // Optionally, handle the error by showing a message or using fallback data
      }
    };

    fetchQuestions();
  }, []);

  // Handle question click to change the selected question
  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setShowTerminal(false);
    const newViewedQuestions = [...viewedQuestions];
    newViewedQuestions[index] = true;
    setViewedQuestions(newViewedQuestions);
  };

  // Handle code input change
  const handleCodeChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[selectedQuestion] = event.target.value;
    setAnswers(newAnswers);
  };

  // Handle submit action
  const handleSubmit = () => {
    const newSubmitted = [...submitted];
    newSubmitted[selectedQuestion] = true;
    setSubmitted(newSubmitted);
  };

  // Handle mark for review action
  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[selectedQuestion] = !newMarkedForReview[selectedQuestion];
    setMarkedForReview(newMarkedForReview);
  };

  // Handle next question navigation
  const handleNextQuestion = () => {
    const newViewedQuestions = [...viewedQuestions];
    if (!answers[selectedQuestion] && !submitted[selectedQuestion] && !markedForReview[selectedQuestion]) {
      newViewedQuestions[selectedQuestion] = true;
    }
    setViewedQuestions(newViewedQuestions);
    setSelectedQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setShowTerminal(false);
  };

  // Handle previous question navigation
  const handlePreviousQuestion = () => {
    const newViewedQuestions = [...viewedQuestions];
    if (!answers[selectedQuestion] && !submitted[selectedQuestion] && !markedForReview[selectedQuestion]) {
      newViewedQuestions[selectedQuestion] = true;
    }
    setViewedQuestions(newViewedQuestions);
    setSelectedQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    setShowTerminal(false);
  };

  // Handle run code action
  const handleRun = () => {
    setShowTerminal(true);
  };

  // Handle sidebar toggle
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar */}
      <div className='Navbar'>
        <img src={logo} className='logo' />
        <p className='timer'> <PiTimerBold /> 00:30:00</p>
      </div>

      {/* Test Page */}
      <div className="test-page">
        {/* Collapsible Question Numbers */}
        <MDBCollapse open={isOpen}>
          <div className="question-tabs">
            <div className='qnumbers'>
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`question-number 
                        ${submitted[index] ? 'submitted' : markedForReview[index] ? 'review' : viewedQuestions[index] && !answers[index] ? 'not-answered' : ''}
                        ${selectedQuestion === index ? 'active' : ''}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {`Q${index + 1}`}
                </div>
              ))}
            </div>
          </div>
        </MDBCollapse>

        {/* Main Content */}
        <div className="content">
          {questions.length > 0 && (
            <>
              {/* Question Details */}
              <div className="question-details">
                <MDBBtn onClick={toggleOpen} style={{backgroundColor:"blueviolet",padding:"5px 10px", fontSize:"20px"}}>
                  <MDBIcon fas icon="bars" />
                </MDBBtn>
                <h2>Question {selectedQuestion + 1}</h2>
                <strong>Scenario:</strong>
                <p>{questions[selectedQuestion].scenario}</p>
                <strong>Constraints:</strong>
                <p>{questions[selectedQuestion].constraints}</p>
                <strong>Sample Input:</strong>
                <p className='highlight'>{questions[selectedQuestion].sampleInput}</p>
                <strong>Sample Output:</strong>
                <p className='highlight'>{questions[selectedQuestion].sampleOutput}</p>
                <div><strong>Test Cases:</strong></div>
                <div className='highlight'>
                  {questions[selectedQuestion].testCases.map((testCase, index) => (
                    <li className='li' key={index} >{`Input: ${testCase.input}, Output: ${testCase.output}`}</li>
                  ))}
                </div>
              </div>

              {/* Code Editor */}
              <div className="code-editor">
                <div className='tophead'>
                  <div className='s1'>
                    <FaCode style={{backgroundColor:'blueviolet', fontSize:'40px',margin:"6px 10px"}} />
                    <h3 className='head' >code <span style={{ color: "blueviolet" }}>editor</span></h3>
                  </div>
                  <div className='s1'>
                    <button onClick={handleRun} className='submitbtn'><IoPlayOutline />Run</button>
                  </div>
                </div>
                <textarea
                  value={answers[selectedQuestion]}
                  onChange={handleCodeChange}
                  placeholder="Write your code here..."
                ></textarea>
                <div className="buttons">
                  <button onClick={handleSubmit} className='runbtn'>Save&next</button>
                  <label>
                    <input
                      type="checkbox"
                      checked={markedForReview[selectedQuestion]}
                      onChange={handleMarkForReview}
                    />
                    Mark as review
                  </label>
                </div>
                <div className='btngrp'>
                  <button onClick={handlePreviousQuestion} disabled={selectedQuestion === 0} className='navigationbtns'>
                    Previous
                  </button>
                  {selectedQuestion === questions.length - 1 ? (
                    <button className='navigationbtns' onClick={handleSubmit}>
                      Submit
                    </button>
                  ) : (
                    <button className='navigationbtns' onClick={handleNextQuestion}>
                      Next
                    </button>
                  )}
                </div>
                
                {showTerminal && <>
                  <h3 className='outputhead'>Output</h3>
                <div className="terminal">
                  {/* Output logic */}
                  Terminal Output
                </div>
                </>
                }
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
