import React from 'react'
import Navbar from './Navbar'
import './Dashboard.css'
import { MDBIcon } from 'mdb-react-ui-kit'
const Dashboard = () => {
  return (
    <div >
      <Navbar />
      <div className='d-container'>
        <section className='d-box'>
          <MDBIcon fas icon="file-code" className='d-icon' />
          <h3 className='d-head'>Problem Statement</h3>
        </section>
        <section className='d-box'>
          <MDBIcon fas icon="puzzle-piece" className='d-icon' />
          <h3 className='d-head'>Workshop Area</h3>
        </section>
        <section className='d-box'>
          <MDBIcon fas icon="book" className='d-icon' />
          <h3 className='d-head'>Working Material</h3>
        </section>
      </div>
    </div>

  )
}

export default Dashboard
