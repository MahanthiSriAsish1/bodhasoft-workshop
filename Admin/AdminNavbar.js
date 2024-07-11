import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
} from 'mdb-react-ui-kit';
import './Admin.css';
import logo from './bodhasoft-logo.png';
export default function AdminNavbar() {
  return (
    <>
      <MDBNavbar sticky light className='Navbar'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
          <section className='logo'>
                    <img src={logo}  alt='bodhasoft' className='logo-img'/>
                    <h3 className='bodhasoft-name'>Bodhasoft</h3>
                 </section>
          </MDBNavbarBrand>
          <MDBNavbarBrand href='#'>
          {/* <section className='username'>
                <MDBIcon fas icon="user-alt" className='user-icon'/>
                <p className='username-text'>username </p>
                </section> */}
          </MDBNavbarBrand>

        </MDBContainer>
      </MDBNavbar>
    </>
  );
}