import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/Login.css';
import { sendDetails } from '../service/loginService/Details';
import Navbar from './Navbar';

const Login = ({ setAuthentication }) => {
  const [name, setName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !instituteName || !mobileNumber || !email) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const data = {
        userName: name,
        emailId: email,
        institution: instituteName,
        phone: mobileNumber,
      };

      try {
        const response = await sendDetails(data);
        localStorage.setItem('loginAuthenticated', 'true');
        setAuthentication(true);
        navigate('/dashboard', { replace: true });
        if (response === 'Document already exists') {
          localStorage.setItem('loginAuthenticated', 'true');
          setAuthentication(true);
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        alert('Error sending details. Please try again.');
      }
    } catch (error) {
    }
  };

  return (
    <div className='helloworld'>
      <div className="NavBarContainer">
        <Navbar />
      </div>
      <div className="loginContainer">
        <div className='RegistrationHeading'>
          <h2 className="loginHeading">Let's Get You Started</h2>
          <p className="proceed">Fill Your Details To Proceed</p>
        </div>
        <div>

          <input
            className="input"
            type="text"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className="input select"
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
          >
            <option value="" disabled>Select your institute name</option>
            <option value="Rajeev Gandhi Memorial College of Engineering and Technology">Rajeev Gandhi Memorial College of Engineering and Technology</option>
            <option value="Sri Venkateshwara College of Engineering">Sri Venkateshwara College of Engineering</option>
            <option value="Chadalawada Ramanamma Engineering College">Chadalawada Ramanamma Engineering College</option>
            <option value="Sreenivasa Institute of Technology and Management Studies">Sreenivasa Institute of Technology and Management Studies</option>
          </select>
          <button className="loginButton" onClick={handleLogin}>
            Submit
          </button>
        </div>
        <div className="links">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
