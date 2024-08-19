import React from 'react';
import '../TRtest/TRtestpage.css'
import { MDBBtn } from 'mdb-react-ui-kit';
import { PiTimerBold } from 'react-icons/pi';
import logo from '../Dashboard/BodhaSoft_logo_purple-removebg.png';
import { Link } from 'react-router-dom';

const instructions = [
  'Click "Start Quiz" to begin with multiple-choice questions.',
  'Use "Previous" and "Next" to navigate. ',
  '"Save & Next" saves and moves to the next question.',
  'Click an option to select your answer.',
  'Check "Mark as review" to revisit questions before submission.',
  'Click "Submit" after answering all questions. No changes allowed post-submission.',
  'Sidebar shows progress: Green (submitted), Yellow (marked for review), Gray (unanswered). Click a number to revisit.',
];

const MCQinstruction = () => {
  return (
    <>
    <div className='navbar'>
        <img src={logo} className='logo' alt="Logo" />
        <p className='timer'> <PiTimerBold /> 
        {/* timmer logic here */}
        00:30:00</p>
      </div>

    <div className="instructions-container">
    <h3 className='instructionhead'>Welcome to the MCQ test! Please follow the instructions below</h3>
    
    <div className='instructions'>
    <h1 style={{color:'blueviolet'}}>Instructions : </h1>
    {instructions.map((instruction, index) => (
      <p key={index}>{instruction}</p>
    ))}
    <center>
    <Link to='/mcqtest-instructions'>
    <MDBBtn style={{ backgroundColor: "blueviolet", padding: "10px 20px", fontSize: "18px" }}>
      Start Test
    </MDBBtn></Link>
    </center>
    </div>
  </div>
  </>
  );
};

export default MCQinstruction;
