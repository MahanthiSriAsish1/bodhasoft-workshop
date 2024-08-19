import React, { useState } from 'react'; // Importing React and useState hook for managing state
import './Login.css'; // Importing CSS for styling the component
import logo from './Programmer-amico.png'; // Importing logo image for the registration page
import axios from 'axios'; // Importing axios for making HTTP requests
import Navbar from './Navbar'; // Importing Navbar component for navigation
import { Link } from 'react-router-dom';

const Registration = () => {
  // State variables for managing form inputs and messages
  const [email, setEmail] = useState(''); // State for email input
  const [rollno, setRollno] = useState(''); // State for roll number input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [message, setMessage] = useState(''); // State for displaying messages

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the boolean value of showPassword
  };

  // Function to handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (password !== confirmPassword) {
      alert("Passwords do not match"); // Display error if passwords don't match
      return;
    }

    try {
      // Sending POST request to the backend for registration
      const response = await axios.post('http://localhost:5000/api/register', {
        email, // Sending email from state
        rollno, // Sending roll number from state
        password, // Sending password from state
      });
      setMessage('Registration successful'); // Display success message on successful registration
    } catch (error) {
      // Display alert on error (e.g., invalid data)
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className='l-mainpage' >
      {/* Navbar component for navigation */}
      <Navbar />
      <div className='l-container'>
        <div className="l-box1">
          {/* Logo image displayed on the registration page */}
          <img src={logo} className='loginImg' alt="Registration Illustration" />
        </div>
        <div className="l-box2">
          <div className="login-box" style={{}}>
            <h3 className="login-heading">Register</h3>
            <form onSubmit={handleSubmit}>
              {/* Email input field */}
              <div className="form-group">
                {/* <label htmlFor="email">E-mail</label> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter your email'
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  required
                />
              </div>
              {/* Roll number input field */}
              <div className="form-group">
                {/* <label htmlFor="rollno">Roll No</label> */}
                <input
                  type="text"
                  placeholder='Enter your Roll number'
                  id="rollno"
                  name="rollno"
                  className="input-field"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)} // Update roll number state on change
                  required
                />
              </div>
              {/* Password input field with visibility toggle */}
              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    id="password"
                    placeholder='Enter your password'
                    name="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state on change
                    required
                  />
                  {/* Button to toggle password visibility */}
                  <button type="button" onClick={togglePasswordVisibility} className="show-password-button">
                    <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                  </button>
                </div>
              </div>
              {/* Confirm Password input field */}
              <div className="form-group">
                {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    id="confirmPassword"
                    placeholder='Confirm your password'
                    name="confirmPassword"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on change
                    required
                  />
                  {/* Button to toggle password visibility */}
                  <button type="button" onClick={togglePasswordVisibility} className="show-password-button">
                    <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                  </button>
                </div>
              </div>
              {/* Submit button for the form */}
              <center>
              <Link to="/dashboard"> 
                <button type="submit" className="sign-in-button">Register</button>
              </Link>
              </center>
            </form>
            {/* Display success message if registration is successful */}
            {message && <p>{message}</p>}
            {/* Prompt for login if user already has an account */}
            <p className="register-prompt">
              Already have an account? 
              <Link to='/' >
              <a href="#" className="register-link">Sign in</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration; // Exporting the Registration component for use in other parts of the application
