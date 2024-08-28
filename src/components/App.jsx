import React, { useState } from 'react';
import './App.css';
import HRQuestions from './hrQuestions';
import MCQComponent from './MCQs';
import NotificationContent from './NotificationContent';
import SubjectForm from './Subjects';
import TRquestions from './TRquestions';
import logo from "./BodhaSoft_logo_purple-removebg.png";
import { IoMdNotificationsOutline } from 'react-icons/io'; // Import the icon
import { FaBarsStaggered, FaCode, FaUserPen, FaUserTie } from 'react-icons/fa6';
import { SiCodementor } from 'react-icons/si';
import { FaUserEdit } from 'react-icons/fa';
import Mainpage from './Mainpage';
import Mentorrequest from './Mentorrequest';
import Mockinterviewrequest from './Mockinterview';

function App() {
  const [selectedButton, setSelectedButton] = useState(null);

  const options = [
    {
      text: "Send a Notification",
      icon: <IoMdNotificationsOutline />,
    },
    {
      text: "TR questions",
      icon: <FaCode />,
    },
    {
      text: "HR questions",
      icon: <FaUserTie />,
    },
    {
      text: "MCQs",
      icon: <FaBarsStaggered />,
    },
    {
      text: "Mock Interview Requests",
      icon: <FaUserEdit />,
    },
    {
      text: "Mentoring Requests",
      icon: <SiCodementor />,
    },
    // {
    //   text: "Logout",
    //   icon: <MdOutlineLogout />,
    // },
  ];

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  const renderContent = () => {
    switch (selectedButton) {
      case 'Send a Notification':
        return <NotificationContent />;
      case 'TR questions':
        return <TRquestions />;
      case 'HR questions':
        return <HRQuestions />;
      case 'MCQs':
        return <MCQComponent />;
      case 'Mock Interview Requests':
        return <Mockinterviewrequest/>
      case 'Mentoring Requests':
        return <Mentorrequest/>;
      // case 'Logout':
      //   return <div>Logout content</div>;
      default:
        return <Mainpage/>;
    }
  };

  return (
    <>
    <div className="container">
      <div className="side">
        <img src={logo} className="logo" alt="BodhaSoft Logo" />
        <ul>
          {options.map((option, index) => (
            <button
              className="options"
              key={index} 
              onClick={() => handleButtonClick(option.text)}
            >
              <li>
                {option.icon} {option.text}
              </li>
            </button>
          ))}
        </ul>
      </div>
      <div className="content">
      <nav className='nav'><h2>Admin Dashboard</h2></nav>
       <div className='contentbox' >{renderContent()}</div> 
        </div>
    </div>
    </>
  );
}

export default App;
