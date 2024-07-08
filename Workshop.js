import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
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
import './Workshop.css';
import Navbar from './Navbar';

export default function Workshop() {
    // State to manage the visibility of the modal
    const [basicModal, setBasicModal] = useState(false);

    // State to hold the list of questions
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: 'What is the purpose of the "const" keyword in JavaScript?',
            options: ['To declare a variable with a constant value', 'To create a function', 'To handle errors', 'To define a loop'],
            correctAnswer: 0,
            code: "#include <stdio.h>\n\nint main() {"
        },
        {
            id: 2,
            question: 'What is the difference between "let" and "var" in JavaScript?',
            options: ['There is no difference', 'The scope of "let" is block-level, while the scope of "var" is function-level', 'The "let" keyword is used for declaring constants, while "var" is used for declaring variables', 'The "let" keyword is used for declaring variables, while "var" is used for declaring functions'],
            correctAnswer: 1,
            code: "    int a, b, temp;"
        },
        {
            id: 3,
            question: 'What is the purpose of the "map()" method in JavaScript?',
            options: ['To create a new array with transformed elements', 'To filter an array based on a condition', 'To perform a calculation on each element of an array', 'To sort an array in ascending order'],
            correctAnswer: 0,
            code: "    // Input\n    printf(\"Enter two integers: \");\n    scanf(\"%d %d\", &a, &b);"
        },
        {
            id: 4,
            question: 'What is the purpose of the "filter()" method in JavaScript?',
            options: ['To create a new array with elements that pass a certain condition', 'To transform each element of an array', 'To perform a calculation on each element of an array', 'To sort an array in ascending order'],
            correctAnswer: 0,
            code: "    // Swap logic\n    temp = a;\n    a = b;\n    b = temp;"
        },
        {
            id: 5,
            question: 'What is the purpose of the "forEach()" method in JavaScript?',
            options: ['To iterate over each element of an array and perform a function', 'To create a new array with transformed elements', 'To filter an array based on a condition', 'To sort an array in ascending order'],
            correctAnswer: 0,
            code: "    // Output\n    printf(\"After swapping: a = %d, b = %d\\n\", a, b);\n\n    return 0;\n}"
        },
        {
            id: 6,
            question: 'What is the purpose of the "forEach()" method in JavaScript?',
            options: ['To iterate over each element of an array and perform a function', 'To create a new array with transformed elements', 'To filter an array based on a condition', 'To sort an array in ascending order'],
            correctAnswer: 0,
            code: "    // Output\n    printf(\"After swapping: a = %d, b = %d\\n\", a, b);\n\n    return 0;\n}"
        },{
            id: 7,
            question: 'What is the purpose of the "forEach()" method in JavaScript?',
            options: ['To iterate over each element of an array and perform a function', 'To create a new array with transformed elements', 'To filter an array based on a condition', 'To sort an array in ascending order'],
            correctAnswer: 0,
            code: "    // Output\n    printf(\"After swapping: a = %d, b = %d\\n\", a, b);\n\n    return 0;\n}"
        },{
            id: 8,
            question: 'What is the purpose of the "forEach()" method in JavaScript?',
            options: ['To iterate over each element of an array and perform a function', 'To create a new array with transformed elements', 'To filter an array based on a condition', 'To sort an array in ascending order'],
            correctAnswer: 0,
            code: "    // Output\n    printf(\"After swapping: a = %d, b = %d\\n\", a, b);\n\n    return 0;\n}"
        },
    ]);

    // State to hold the current question being displayed in the modal
    const [currentQuestion, setCurrentQuestion] = useState(null);

    // State to hold the selected option for the current question
    const [selectedOption, setSelectedOption] = useState(null);

    // State to determine if the selected answer is correct
    const [isCorrect, setIsCorrect] = useState(null);

    // State to control the display of the result after submitting an answer
    const [showResult, setShowResult] = useState(false);

    // State to keep track of correct answers
    const [correctAnswers, setCorrectAnswers] = useState([]);

    // State to keep track of answered questions
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    // State to hold the displayed answers (code snippets)
    const [displayedAnswers, setDisplayedAnswers] = useState([]);

    // Fetch questions from the backend when the component mounts
    useEffect(() => {
        axios.get('https://example.com/api/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    // Function to toggle the modal open and set the current question
    const toggleOpen = (questionIndex) => {
        setCurrentQuestion(questions[questionIndex]);
        setSelectedOption(null);
        setIsCorrect(null);
        setShowResult(false);
        setBasicModal(!basicModal);
    };

    // Function to handle the selection of an option
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // Function to handle the submission of an answer
    const handleSubmit = () => {
        const correctAnswer = currentQuestion.correctAnswer;
        const isAnswerCorrect = selectedOption === correctAnswer;
        setIsCorrect(isAnswerCorrect);
        setShowResult(true);

        // Update the correct answers and answered questions state if the answer is correct
        if (isAnswerCorrect && !correctAnswers.some(answer => answer.id === currentQuestion.id)) {
            setCorrectAnswers(prev => [...prev, { id: currentQuestion.id, correctOption: currentQuestion.options[correctAnswer] }]);
            setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
        }

        // Close modal after 1 second
        setTimeout(() => setBasicModal(false), 1000);
    };

    // Function to handle the display of selected option (code snippet) for answered questions
    const handleShowSelectedOption = (questionId) => {
        if (!displayedAnswers.some(answer => answer.id === questionId)) {
            const selectedQuestion = questions.find(q => q.id === questionId);
            setDisplayedAnswers(prev => [...prev, { id: selectedQuestion.id, code: selectedQuestion.code }]);
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
                                    // Show button to display code snippet if question is answered
                                    <>
                                        <button onClick={() => handleShowSelectedOption(question.id)} className='print-module-button'>
                                          <pre> {question.code} </pre> 
                                        </button>
                                    </>
                                ) : (
                                    // Show unlock button if question is not answered
                                    <>
                                        <section className='module-text'>Module {question.id}</section>
                                        <MDBBtn onClick={() => toggleOpen(index)} id='unlock'>
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
                                    <p>{currentQuestion?.question}</p>
                                    <ul>
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
                                    {/* <MDBBtn color='secondary' onClick={() => setBasicModal(false)}>
                                        Close
                                    </MDBBtn> */}
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
                        <h2 className='compiler-heading'><MDBIcon fas icon="code" style={{backgroundColor:'#7A37F7',padding:'5px'}} /> Code <span style={{ color: "#7A37F7"}}>Editor</span></h2>
                    </div>
                    <div className='coding-pannel'>
                        {displayedAnswers.map((answer, index) => (
                            <section key={index}>
                                <pre>{answer.code}</pre>
                            </section>
                        ))}
                    </div>
                    <br />
                    
                    <button className='runbutton'>Run</button>
                    <h2  style={{ color: "#7A37F7" }}>Output</h2>
                
                    <div className='output-pannel'>
                        {/* Write output logic here */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
