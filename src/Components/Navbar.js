import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import '../Styles/Workshop.css';
import logo from '../Assets/bodhasoft-logo.png';
import { useNavigate } from 'react-router-dom';



export default function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard')
  }
  return (
    <>
      <MDBNavbar sticky light className='Navbar'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/dashboard'>
            <section className='logo' onClick={handleLogoClick} style={{ boxSizing: 'border-box' }}>
              <img src={logo} alt='bodhasoft' className='logo-img' />
              <h3 className='bodhasoft-name'>Bodhasoft</h3>
            </section>
          </MDBNavbarBrand>
          {/* <MDBNavbarBrand>
            <section className='username'>
              <MDBIcon fas icon="user-alt" className='user-icon' />
              <p className='username-text'>username </p>
            </section>
          </MDBNavbarBrand> */}

        </MDBContainer>
      </MDBNavbar>
    </>
  );
}