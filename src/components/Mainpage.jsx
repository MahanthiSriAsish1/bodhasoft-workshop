import React from 'react'
import { FaCode, FaUserTie } from 'react-icons/fa6'
import './styles/Mainpage.css'
import MainTable from './MainTable'
import student  from './student.png';
import skill from './professional.png';
import mentor from './training.png';
const Mainpage = () => {
  
  return (
   <>
   <div className='m-container'>
    <div className='m-box'>
      <img className="icons" src={student}/>
      <p className='m-count'>00</p>
      <text className='m-name'>students</text>
    </div>

    <div className='m-box'>
      <img className="icons" src={skill}/>
      <p className='m-count'>00</p>
      <text className='m-name'>mentors</text>
    </div>

    <div className='m-box'>
      <img className="icons" src={mentor}/>
      <p className='m-count'>10</p>
      <text className='m-name'>skills</text>
    </div>
   </div>
   <div className='tablecontainer' >
<div className='table'>
</div>
<div className='table'>
</div>
   </div>
   <MainTable/>
   </>
  )
}

export default Mainpage
