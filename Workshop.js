import React, { Fragment, useState } from 'react';
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

const questions = [
    {
        id: 1,
        question: 'What is the purpose of the "const" keyword in JavaScript?',
        options: ['To declare a variable with a constant value', 'To create a function', 'To handle errors', 'To define a loop'],
        correctAnswer: 0,
    },
    {
        id: 2,
        question: 'What is the difference between "let" and "var" in JavaScript?',
        options: ['There is no difference', 'The scope of "let" is block-level, while the scope of "var" is function-level', 'The "let" keyword is used for declaring constants, while "var" is used for declaring variables', 'The "let" keyword is used for declaring variables, while "var" is used for declaring functions'],
        correctAnswer: 1,
    },
    {
        id: 3,
        question: 'What is the purpose of the "map()" method in JavaScript?',
        options: ['To create a new array with transformed elements', 'To filter an array based on a condition', 'To perform a calculation on each element of an array', 'To sort an array in ascending order'],
        correctAnswer: 0,
    },
    {
        id: 4,
        question: 'What is the purpose of the "filter()" method in JavaScript?',
        options: ['To create a new array with elements that pass a certain condition', 'To transform each element of an array', 'To perform a calculation on each element of an array', 'To sort an array in ascending order'],
        correctAnswer: 0,
    },
    {
        id: 5,
        question: 'What is the purpose of the "forEach()" method in JavaScript?',
        options: ['To iterate over each element of an array and perform a function', 'To create a new array with transformed elements', 'To filter an array based on a condition', 'To sort an array in ascending order'],
        correctAnswer: 0,
    },
    {
        id: 6,
        question: 'What is the purpose of the "arrow function" syntax in JavaScript?',
        options: ['To define a function in a more concise way', 'To declare a variable', 'To handle errors', 'To create a loop'],
        correctAnswer: 0,
    },
    {
        id: 7,
        question: 'What is the purpose of the "Promise" object in JavaScript?',
        options: ['To handle asynchronous operations', 'To define a function', 'To declare a variable', 'To sort an array'],
        correctAnswer: 0,
    },
    {
        id: 8,
        question: 'What is the purpose of the "async/await" syntax in JavaScript?',
        options: ['To handle asynchronous operations in a more readable way', 'To define a function', 'To declare a variable', 'To sort an array'],
        correctAnswer: 0,
    },
];

export default function Workshop() {
    const [basicModal, setBasicModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [displayedAnswers, setDisplayedAnswers] = useState([]);

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
    };

    const handleShowSelectedOption = (questionId) => {
        if (!displayedAnswers.some(answer => answer.id === questionId)) {
            const selectedQuestion = questions.find(q => q.id === questionId);
            setDisplayedAnswers(prev => [...prev, { id: selectedQuestion.id, correctOption: selectedQuestion.options[selectedQuestion.correctAnswer] }]);
        }
    };

    return (
        <Fragment>
            <div className='Container'>
                <div className='box1'>
                    {questions.map((question, index) => (
                        <center key={question.id}>
                            <div className='modules'>
                               
                                {answeredQuestions.includes(question.id) ? (
                                     <>
                                    {/* <section className='module-text'>Module{question.id}</section> */}

                                    <button  onClick={() => handleShowSelectedOption(question.id)} className='print-module-button'>
                                        Module {question.id}
                                    </button>
                                    </>
                                ) : (
                                    <>
                                        <section className='module-text'>Module{question.id}</section>
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
                                    <MDBBtn color='secondary' onClick={() => setBasicModal(false)}>
                                        Close
                                    </MDBBtn>
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
                        <h2 className='compiler-heading'>Online <span style={{ color: "blueviolet" }}>coding</span></h2>
                       
                    </div>
                    <div className='coding-pannel'>
                        {displayedAnswers.map((answer, index) => (
                            <section key={index}>
                                {answer.correctOption}
                            </section>
                        ))}
                    </div>
                    <br />
                    <button className='runbutton'>Run</button>
                </div>
              
            </div>
        </Fragment>
    );
}
