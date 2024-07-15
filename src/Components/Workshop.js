
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

export default function Workshop() {
  const [basicModal, setBasicModal] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What is the purpose of the "const" keyword in JavaScript?',
      options: ['To declare a variable with a constant value', 'To create a function', 'To handle errors', 'To define a loop'],
      correctAnswer: 0,
      code: "#include <stdio.h>\n\nint main() {\n    int count = 0;\n "
    },
    {
      id: 2,
      question: 'What is the difference between "let" and "var" in JavaScript?',
      options: ['There is no difference', 'The scope of "let" is block-level, while the scope of "var" is function-level', 'The "let" keyword is used for declaring constants, while "var" is used for declaring variables', 'The "let" keyword is used for declaring variables, while "var" is used for declaring functions'],
      correctAnswer: 1,
      code: "    int array[] = {60, 75, 5, 44, 30, 6};\n"
    },
    {
      id: 3,
      question: 'What is the purpose of the "map()" method in JavaScript?',
      options: ['To create a new array with transformed elements', 'To filter an array based on a condition', 'To perform a calculation on each element of an array', 'To sort an array in ascending order'],
      correctAnswer: 0,
      code: "    int i;\n\n    for (i = 1; i < 5; i++) {\n"
    },
    {
      id: 4,
      question: 'What is the purpose of the "filter()" method in JavaScript?',
      options: ['To create a new array with elements that pass a certain condition', 'To transform each element of an array', 'To perform a calculation on each element of an array', 'To sort an array in ascending order'],
      correctAnswer: 0,
      code: "   if (array[i] > array[i - 1] && array[i] > array[i + 1]) {\n            count++;\n        }\n"
    },
    {
      id: 5,
      question: 'What is the purpose of the "forEach()" method in JavaScript?',
      options: ['To iterate over each element of an array and perform a function', 'To create a new array with transformed elements', 'To filter an array based on a condition', 'To sort an array in ascending order'],
      correctAnswer: 0,
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
  const [lockStatuses, setLockStatuses] = useState([false,false,false,false,false]);
  const [socket, setSocket] = useState(null);

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
    if (!displayedAnswers.some(answer => answer.id === questionId)) {
      const selectedQuestion = questions.find(q => q.id === questionId);
      setDisplayedAnswers(prev => [...prev, { id: selectedQuestion.id, code: selectedQuestion.code }]);
      setCodeValue(prevCodeValue => prevCodeValue + '\n' + selectedQuestion.code);
    }
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
                  <p style={{justifyContent :"left"}}>{currentQuestion?.question}</p>
                  <ul style={{paddingLeft :"0"}}>
                    {currentQuestion?.options.map((option, index) => (
                      <p key={index}>
                        <MDBBtn
                          color={selectedOption === index ? (showResult ? (isCorrect ? 'success' : 'danger') : 'purple') : 'secondary'}
                          onClick={() => handleOptionSelect(index)}
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
    </Fragment>
  );
}
