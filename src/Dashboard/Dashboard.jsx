import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'
import bodhadoft from './BodhaSoft_logo_purple-removebg.png'
import img from './Computer login-amico.png'
import Profile from './profile';
import mcqtest from './mcqtest.png';
import codetest from './codetest.png';
import trtest from './trtest.png';
const Dashboard = () => {
  return (
    <Fragment>
      <div className='background'>
      <div className='mainbox'>
    {/* // ------------------------navbar-------------------------- */}
    <MDBNavbar  light bgColor='light' style={{ justifyContent: 'space-between' , borderRadius:'10px',padding:'4px 15px' , flexDirection:'row'}}>
        <div> <img src={bodhadoft} className='logo'/></div>
        <div> <Profile/> </div>
      </MDBNavbar>
    <center>
    <div className='intro'>
      <div className='introbox1'>
        <h2 className='usernameheading' >Hello,  user </h2>
        <p className='para'>Keep up your amazing progress!!</p></div> 
      <div className='introbox2'> <img src={img} className='img'/></div> 
      </div>
      
    <div className='d-container'>
      <Link to='/mcqtest'>
        <div className='d-box'>
          <img src={mcqtest} className='boximg'/>
          <h2 className='boxtext'>MCQ Test</h2>
          </div>
      </Link>
      <Link to='/codingtest'>
      <div className='d-box'>
          <img src={codetest} className='boximg'/>
          <h2 className='boxtext'>Code Test</h2>
          </div>
      </Link>
      <Link to='/trtest'>
      <div className='d-box'>
          <img src={trtest} className='boximg'/>
          <h2 className='boxtext'>TR Test</h2>
          </div>
      </Link>
    </div>
    </center>
    </div>
    </div>
    
    </Fragment>
  );
}

export default Dashboard;
