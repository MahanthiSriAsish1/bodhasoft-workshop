import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLogin = () => {
    if (!name || !instituteName || !mobileNumber) {
      alert('Please fill out all fields');
    } else {
      setShowOtpField(true);
    }
  };

  const handleOtpSubmit = () => {
    if (otp === '123456') { // Assuming '123456' is the correct OTP for demo purposes
      alert('You are now logged in!');
      // Here, you can add further actions such as navigating to another screen
    } else {
      alert('Please enter a valid OTP');
    }
  };

  return (
    <div className="safeArea">
      <div className="container">
        {!showOtpField ? (
          <>
            <div className="loginContainer">
              <h2 className="loginHeading">Login</h2>

              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className="input select"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
              >
                <option value="" disabled>Select your institute name</option>
                <option value="SVCE">SVCE</option>
                <option value="Chadalawada">Chadalawada</option>
                <option value="SITAMS">SITAMS</option>
              </select>
              <input
                className="input"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <button className="loginButton" onClick={handleLogin}>
                Submit
              </button>
              <button className="socialLoginButton google">
                Sign in with Google
              </button>
              <div className="links">
                <span>Sign Up</span>  <span>Forgot Password</span>
              </div>
            </div>
          </>
        ) : (
          <div className="otpContainer">
            <h2 className="loginHeading">Enter OTP</h2>
            <input
              className="input"
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="loginButton" onClick={handleOtpSubmit}>
              Submit OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
