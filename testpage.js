import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import './navbar.css'; 
import Navbar from './components/navtag';

const TestHome = () => {
    const [Heading, setHeading] = useState('Instructions');
    const [examName, setExamName] = useState('<exam name>');
    const [userName, setUserName] = useState('<user name>');
    const [instructions, setinstructions] = useState('Please dont copy in the examination');

    useEffect(() => {
        // Fetch data from the backend
        fetch('/api/exam-and-user')
            .then(response => response.json())
            .then(data => {
                setExamName(data.examName);
                setUserName(data.userName);
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <Fragment>
            <Navbar/>
            
            <div className='rows'>

                <div className='box col-6'>
                    <div className='div'>
                    <div className='content'>{examName} </div>
                    <h2>{Heading}</h2>
                    <div className='instructions'>{instructions}</div>
                    <table className='table tab1'>
                        <tr>
                            <td>Questions</td>
                            <td>Duration</td>
                        </tr>
                        <tr>
                            <td>40</td>
                            <td>60 min</td>
                        </tr>
                    </table>
                </div>
                </div>
                <div className='box col-6'>
                  <center> 
                    <form>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username"/>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"/>
    </div>
    <div class="form-group">
      <label for="college">College:</label>
      <input type="text" id="college" name="college"/>
    </div>
    <button type="submit">Submit</button>
  </form>
                   
                    </center>
                   
                   
                </div>
            </div>

        </Fragment>
    )
}

export default TestHome