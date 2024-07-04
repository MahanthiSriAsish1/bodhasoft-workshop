import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import sendOtp from '../../service/loginService/sendOtpService';
import verifyOtp from '../../service/loginService/verifyOtpservice';

const LoginDetails = () => {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendOtp = async () => {
    try {
      const confirmation = await sendOtp(phone);
      console.log('OTP confirmation:', confirmation);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      console.error('No confirmation result available');
      return;
    }

    try {
      const user = await verifyOtp(confirmationResult, otp);
      console.log('User verified:', user);
      // User is successfully verified
      // You can now navigate to another page or update the UI accordingly
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle OTP verification error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    console.log('Phone number:', phone);
  }, [phone]);

  useEffect(() => {
    console.log('OTP:', otp);
  }, [otp]);

  useEffect(() => {
    console.log('Name:', name);
  }, [name]);

  useEffect(() => {
    console.log('College:', college);
  }, [college]);

  return (
    <div className="login-details-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your college"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <PhoneInput
          country={'in'}
          value={phone}
          onChange={(phone) => setPhone("+" + phone)}
          inputClass="input-field"
        />
      </div>
      <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
      <div id="recaptcha" className="recaptcha-container"></div>
      {confirmationResult && (
        <div className="otp-container">
          <input 
            type="text" 
            placeholder='Enter your OTP' 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            className="input-field"
          />
          <button onClick={handleVerifyOtp} className="verify-otp-button">Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default LoginDetails;
