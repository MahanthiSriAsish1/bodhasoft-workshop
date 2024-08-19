import React from 'react';
import '../TRtest/TRtestpage.css'
import { MDBBtn } from 'mdb-react-ui-kit';
import { PiTimerBold } from 'react-icons/pi';
import logo from '../Dashboard/BodhaSoft_logo_purple-removebg.png';
import { Link } from 'react-router-dom';

const instructions = [
    'Click "Start Quiz" to begin. You will see a series of multiple-choice questions.',
    'Use the "Previous" and "Next" buttons to navigate between questions.',
    'Click "Save & Next" to save your answer and move to the next question.',
    'Select an answer by clicking on the option below the question. Your choice will be highlighted.',
    'Mark questions for review by checking the "Mark as review" box to revisit them later before final submission.',
    'Click "Submit" when you have answered all questions to complete the quiz. No further changes can be made after submission.',
    'Check the sidebar for your progress. Green means submitted, yellow means marked for review, and gray means unanswered. Click a question number to revisit it.',
  ];

const Codingtestinstruction = () => {
  return (
    <>
    <div className='navbar'>
        <img src={logo} className='logo' alt="Logo" />
        <p className='timer'> <PiTimerBold /> 
        {/* timmer logic here */}
        00:30:00</p>
      </div>

    <div className="instructions-container">
    <h3 className='instructionhead'>Welcome to the Codding test! Please follow the instructions below</h3>
    
    <div className='instructions'>
    <h1 style={{color:'blueviolet'}}>Instructions : </h1>
    {instructions.map((instruction, index) => (
      <p key={index}>{instruction}</p>
    ))}
    <center>
        <Link to='/codetest-instructions'>
    <MDBBtn style={{ backgroundColor: "blueviolet", padding: "10px 20px", fontSize: "18px" }}>
      Start Test
    </MDBBtn></Link></center>
    </div>
  </div>
  </>
  );
};

export default Codingtestinstruction;
