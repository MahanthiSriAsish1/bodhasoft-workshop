import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import '../Styles/Admin.css';
import logo from '../Assets/bodhasoft-logo.png';
export default function AdminNavbar() {
  return (
    <>
      <MDBNavbar sticky light className='Navbar'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
          <section className='logo'>
                    <img src={logo}  alt='bodhasoft' className='logo-img'/>
                    <h3 className='bodhasoft-name'>Bodhasoft</h3>
                    <h4 style={{marginLeft:"15px", fontFamily:"sans-serif", fontWeight:"bold"}}>Admin Page</h4>
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