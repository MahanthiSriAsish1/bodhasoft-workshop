import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import Navbar from '../bodha/Navbar';
import './Admin.css';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Admin = () => {
  return (
    <div>
      <AdminNavbar />
      <div className='d-container'>
        <Link to='/Problems' className='d-box'>
          <section>
            <center><MDBIcon fas icon="file-code" className='d-icon' /></center>
            <h3 className='d-head'>Problem Statement</h3>
          </section>
        </Link>
        <Link to='/Module' className='d-box'>
          <section>
            <center><MDBIcon fas icon="unlock" className='d-icon' /></center>
            <h3 className='d-head'>Unlock Modules</h3>
          </section>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
