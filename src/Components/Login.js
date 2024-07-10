import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendOtp from '../service/loginService/sendOtpService'
import verifyOtp from '../service/loginService/verifyOtpservice'
import "../Styles/Login.css"
import { sendDetails } from '../service/loginService/Details';

const Login = ({ setAuthentication }) => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();


  const handleResendOtp = async () => {
    try {
      const formattednumber = "+91" + mobileNumber
      const confirmation = await sendOtp(formattednumber);
      alert('OTP Sent')
      // console.log('OTP confirmation:', confirmation);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleLogin = async () => {
    if (!name || !instituteName || !mobileNumber) {
      alert('Please fill out all fields');
    } else {
      try {
        const data = {
          userName: name,
          institution: instituteName,
          phone: mobileNumber,
        };

        try {
          await sendDetails(data);
        } catch (error) {
          console.error('Error sending details:', error);
          return; // Exit if sending details fails
        }

        try {
          const formattedNumber = "+91" + mobileNumber;
          const confirmation = await sendOtp(formattedNumber);
          alert('OTP Sent');
          setConfirmationResult(confirmation);
          setShowOtpField(true);
        } catch (error) {
          console.error('Error sending OTP:', error);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleOtpSubmit = async () => {
    if (!confirmationResult) {
      console.error('No confirmation result available');
      return;
    }
    try {
      await verifyOtp(confirmationResult, otp);
      // console.log('User verified:', user);
      setAuthentication(true);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      alert(`Error verifying OTP: ${error.message}. Please re-enter or re-send OTP.`);
    }
  };

  return (
    <div className="safeArea">
      <div className="container">

        <div className="loginContainer">
          {/* <h2 className="loginHeading"></h2> */}
          <h1 className="heading">Login</h1>

          {!showOtpField && (
            <>
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Enter your institute name"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
              />
              <input
                className="input"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <button className="loginButton" onClick={handleLogin}>
                Login ➜
              </button>
              <div className='recaptcha'></div>
            </>
          )}

          {showOtpField && (
            <>
              <input
                className="input"
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="loginButton" onClick={handleOtpSubmit}>
                Submit OTP ➜
              </button>
              <div className="resendOtp" onClick={handleResendOtp} >
                Resend OTP
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
