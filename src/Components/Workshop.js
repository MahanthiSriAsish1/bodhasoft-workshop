
import React, { Fragment, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
} from 'mdb-react-ui-kit';
import '../Styles/Workshop.css';
import Navbar from '../Components/Navbar';
import { Editor } from '@monaco-editor/react';
import { executeCode } from '../service/pistonService/pistonService';
import store from 'store2';

export default function Workshop() {
  function setItemWithExpiry(key, value, ttl) {
    store.set(key, value, new Date().getTime() + ttl);
  }

  function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // If the item is expired, remove it from storage and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  const [basicModal, setBasicModal] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'One morning Udai and Vishal were talking to each other face to face at a crossing.  If Vishal\'s shadow was exactly to the left of Udai, which direction was Udai facing?',
      options: ['East', 'West', 'South', 'North'],
      correctAnswer: 3,
      code: "#include <stdio.h>\n\nint main() {\n    int count = 0;\n "
    },
    {
      id: 2,
      question: 'If A is the brother of B, B is the sister of C, and C is the father of D, how D is related to A?',
      options: ['Brother', 'Sister', 'Nephew', 'Cannot Determine'],
      correctAnswer: 3,
      code: "    int array[] = {60, 75, 5, 44, 30, 6};\n"
    },
    {
      id: 3,
      question: "Look at this series: 36, 34, 30, 28, 24, ... What number should come next?",
      options: ['20', '22', '26', '23'],
      correctAnswer: 1,
      code: "    int i;\n\n    for (i = 1; i < 5; i++) {\n"
    },
    {
      id: 4,
      question: 'Antonym of RELINQUISH ?',
      options: ['Abdicate', 'Deny', 'Possess', 'Renounce'],
      correctAnswer: 2,
      code: "   if (array[i] > array[i - 1] && array[i] > array[i + 1]) {\n            count++;\n        }\n"
    },
    {
      id: 5,
      question: 'Which one of the following is not a prime number?',
      options: ['61', '91', '71', '31'],
      correctAnswer: 1,
      code: "   }\n\n    printf(\"Count: %d\\n\", count);\n\n    return 0;\n}\n"
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [showOutputPanel, setShowOutputPanel] = useState(false);
  const [language, setLanguage] = useState('c');
  const [output, setOutput] = useState('');
  const [lockStatuses, setLockStatuses] = useState([false, false, false, false, false]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const result1 = getItemWithExpiry('module1unlocked');
    const result2 = getItemWithExpiry('module2unlocked');
    const result3 = getItemWithExpiry('module3unlocked');
    const result4 = getItemWithExpiry('module4unlocked');
    const result5 = getItemWithExpiry('module5unlocked');

    // Update lockStatuses state based on the retrieved values
    setLockStatuses([
      result1 !== null ? result1 : true,
      result2 !== null ? result2 : true,
      result3 !== null ? result3 : true,
      result4 !== null ? result4 : true,
      result5 !== null ? result5 : true,
    ]);
  }, []);

  useEffect(() => {
    if (!socket) {
      setSocket(io(process.env.REACT_APP_SOCKET_SERVER_URL));
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('unlockQuestion', (questionId) => {
      setLockStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        newStatuses[questionId - 1] = false;
        return newStatuses;
      });
      setItemWithExpiry(`module${questionId}unlocked`, true, 86400000);
    });


    return () => {
      socket.off('unlockQuestion');
    };
  }, [socket]);

  const toggleOpen = (questionIndex) => {
    setCurrentQuestion(questions[questionIndex]);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResult(false);
    setBasicModal(!basicModal);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const correctAnswer = currentQuestion.correctAnswer;
    const isAnswerCorrect = selectedOption === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect && !correctAnswers.some(answer => answer.id === currentQuestion.id)) {
      setCorrectAnswers(prev => [...prev, { id: currentQuestion.id, correctOption: currentQuestion.options[correctAnswer] }]);
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
    }

    setTimeout(() => setBasicModal(false), 1000);
  };

  const handleShowSelectedOption = (questionId) => {
    const selectedQuestion = questions.find(q => q.id === questionId);
    
    // Filter out the existing entry from displayedAnswers
    setDisplayedAnswers(prev => prev.filter(answer => answer.id !== questionId));
    
    // Add the selected question code to displayedAnswers and editor
    setDisplayedAnswers(prev => [...prev, { id: selectedQuestion.id, code: selectedQuestion.code }]);
    setCodeValue(prevCodeValue => prevCodeValue + '\n' + selectedQuestion.code);
  };
  

  const handleRunClick = async () => {
    try {
      const result = await executeCode(language, codeValue);
      setShowOutputPanel(true);
      setOutput(result);
    } catch (error) {
      alert("Could Not Execute Code, Please Try in 10 Seconds")
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className='Container'>
        <div className='box1'>
          {questions.map((question, index) => (
            <center key={question.id}>
              <div className='modules'>
                {answeredQuestions.includes(question.id) ? (
                  <>
                    <button onClick={() => handleShowSelectedOption(question.id)} className='print-module-button'>
                      <pre> {question.code} </pre>
                    </button>
                  </>
                ) : (
                  <>
                    <section className='module-text'>Module {question.id}</section>
                    <MDBBtn onClick={() => toggleOpen(index)} id='unlock' disabled={lockStatuses[index]}>
                      <div className='unlock-button'>
                        <section className='unlock-bottontext'>unlock</section>
                        <MDBIcon fas icon="unlock" />
                      </div>
                    </MDBBtn>
                  </>
                )}
              </div>
            </center>
          ))}

          <MDBModal open={basicModal} toggle={() => setBasicModal(!basicModal)} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Module {currentQuestion?.id}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => setBasicModal(false)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <p className='questionPara'>{currentQuestion?.question}</p>
                  <ul style={{ paddingLeft: "0" }}>
                    {currentQuestion?.options.map((option, index) => (
                      <p key={index}>
                        <MDBBtn
                          color={selectedOption === index ? (showResult ? (isCorrect ? 'success' : 'danger') : 'purple') : 'secondary'}
                          onClick={() => handleOptionSelect(index)}
                          className='MCQButton'
                        >
                          <section className='option' style={{ textTransform: 'none' }}> {option} </section>
                        </MDBBtn>
                      </p>
                    ))}
                  </ul>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color='primary' onClick={handleSubmit} disabled={selectedOption === null}>
                    Submit
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>
        <div className='box2'>
          <div>
            <div className='box2-head'>
              <h2 className='compiler-heading'><MDBIcon fas icon="code" style={{ backgroundColor: '#7A37F7', padding: '5px' }} /> Code <span style={{ color: "#7A37F7" }}>Editor</span></h2>
            </div>
            <div className='coding-pannel'>
              <Editor
                defaultLanguage="c"
                theme="vs-dark"
                value={codeValue}
                options={{
                  selectOnLineNumbers: true
                }}
                onChange={(newValue) => setCodeValue(newValue)}
              />
            </div>
            <br />
            <button className='runbutton' onClick={handleRunClick}>Run</button>
          </div>
          <div className='box3'>
            {showOutputPanel && (
              <Fragment>
                <h2 style={{ color: "#7A37F7" }}>Output</h2>
                <div className='output-pannel'>
                  <pre className='output-content'>
                    {output}
                  </pre>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
