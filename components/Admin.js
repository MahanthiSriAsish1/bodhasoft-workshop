import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import './style.css';
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    
      <div className='d-container'>
        <div  className='d-box'>
          <section>
            <center><MDBIcon fas icon="file-code" className='d-icon' /></center>
            <h3 className='d-head'>Problem Statement</h3>
          </section>
        </div>
        <div className='d-box'>
          <section>
            <center><MDBIcon fas icon="unlock" className='d-icon' /></center>
            <h3 className='d-head'>Unlock Modules</h3>
          </section>
        </div>
      </div>
   
  );
};

export default Admin;