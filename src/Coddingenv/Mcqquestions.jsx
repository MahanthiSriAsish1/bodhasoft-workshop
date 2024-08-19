import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './BodhaSoft_logo_purple-removebg.png';
import { FaCode } from 'react-icons/fa';
import { IoPlayOutline } from 'react-icons/io5';
import './mcqquestion.css';
import { MdHome } from 'react-icons/md';
import { MDBBtn, MDBCollapse, MDBIcon } from 'mdb-react-ui-kit';
import { PiTimerBold } from 'react-icons/pi';

const Mcqquestions = () => {
  const initialQuestions = [
    {
      scenario: 'Which of the following is the correct way to declare a variable in JavaScript?',
      options: ['var myVar;', 'let myVar;', 'const myVar;', 'All of the above'],
      correctOption: 3
    },
    {
      scenario: 'Which HTML tag is used to define an unordered list?',
      options: ['<ul>', '<ol>', '<li>', '<list>'],
      correctOption: 0
    },
    {
      scenario: 'Which CSS property is used to change the text color of an element?',
      options: ['color', 'font-color', 'text-color', 'background-color'],
      correctOption: 0
    },
    {
      scenario: 'Inside which HTML element do we put the JavaScript?',
      options: ['<js>', '<script>', '<javascript>', '<code>'],
      correctOption: 1
    },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(initialQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(Array(initialQuestions.length).fill(false));
  const [markedForReview, setMarkedForReview] = useState(Array(initialQuestions.length).fill(false));
  const [viewedQuestions, setViewedQuestions] = useState(Array(initialQuestions.length).fill(false));
  const [showTerminal, setShowTerminal] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/mcq-questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        // Optionally, handle the error by showing a message or using fallback data
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setShowTerminal(false);
    const newViewedQuestions = [...viewedQuestions];
    newViewedQuestions[index] = true;
    setViewedQuestions(newViewedQuestions);
  };

  const handleOptionChange = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[selectedQuestion] = index;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    const newSubmitted = [...submitted];
    newSubmitted[selectedQuestion] = true;
    setSubmitted(newSubmitted);
    handleNextQuestion();
  };

  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[selectedQuestion] = !newMarkedForReview[selectedQuestion];
    setMarkedForReview(newMarkedForReview);
  };

  const handleNextQuestion = () => {
    const newViewedQuestions = [...viewedQuestions];
    if (selectedOptions[selectedQuestion] === null && !markedForReview[selectedQuestion]) {
      newViewedQuestions[selectedQuestion] = true;
    }
    setViewedQuestions(newViewedQuestions);
    setSelectedQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setShowTerminal(false);
  };

  const handlePreviousQuestion = () => {
    setSelectedQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    setShowTerminal(false);
  };

  const handleFinalSubmit = () => {
    // Logic for final submission, e.g., sending data to server or displaying results
    console.log('Final Submission:', selectedOptions);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <div className='Navbar'>
        <img src={logo} className='logo' />
        <p className='timer'>
          {/* use timmer logic here  */}
          <PiTimerBold /> 00:30:00</p>
      </div>

      <div className="test-page">
        <MDBCollapse open={isOpen}>
          <div className="question-tabs">
            <div className='qnumbers'>
            {questions.map((_, index) => (
              <div
                key={index}
                className={`question-number 
                        ${submitted[index] ? 'submitted' : markedForReview[index] ? 'review' : viewedQuestions[index] && selectedOptions[index] === null ? 'not-answered' : ''}
                        ${selectedQuestion === index ? 'active' : ''}`}
                onClick={() => handleQuestionClick(index)}
              >
                {`Q${index + 1}`}
              </div>
            ))}
            </div>
          </div>
        </MDBCollapse>
        <div className="content">
          {questions.length > 0 && (
            <>
              <div className="question-details">
                <MDBBtn onClick={toggleOpen} style={{ backgroundColor: "blueviolet", padding: "5px 10px", fontSize: "20px" }}>
                  <MDBIcon fas icon="bars" /></MDBBtn><br />
                <strong>Question {selectedQuestion + 1}</strong>
                <p className='question'>{questions[selectedQuestion].scenario}</p>
              </div>
              <div className="code-editor">
                <div className="options">
                  {questions[selectedQuestion].options.map((option, index) => (
                    <label key={index} className={`option ${selectedOptions[selectedQuestion] === index ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name={`question${selectedQuestion}`}
                        value={index}
                        checked={selectedOptions[selectedQuestion] === index}
                        onChange={() => handleOptionChange(index)}
                        style={{
                          width: '19px',
                          height: '19px',
                        }}
                      />
                      <text className='optiontext'>{option}</text>
                    </label>
                  ))}
                </div>
                <div className="buttons" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSubmit} className='runbtn'>Save&next</button>
                </div>
                <div className="mark-review">
                  <label>
                    <input
                      type="checkbox"
                      checked={markedForReview[selectedQuestion]}
                      onChange={handleMarkForReview}
                    />
                    Mark as review
                  </label>
                </div>
                <div className='btngroup'>
                  <button onClick={handlePreviousQuestion} disabled={selectedQuestion === 0} className='navigationbtns'>
                    Previous
                  </button>
                  {selectedQuestion === questions.length - 1 ? (
                    <button onClick={handleFinalSubmit} className='navigationbtns'>
                      Submit
                    </button>
                  ) : (
                    <button onClick={handleNextQuestion} className='navigationbtns'>
                      Next
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Mcqquestions;
