import React, { useState } from 'react';
import Navbar from './Navbar';
import '../Styles/Dashboard.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [problemStatementDisabled, setProblemStatementDisabled] = useState(true);
  const [workshopAreaDisabled, setWorkshopAreaDisabled] = useState(true);
  const [workingMaterialDisabled, setWorkingMaterialDisabled] = useState(false);
  const navigate = useNavigate();

  const handleProblemStatementClick = () => {
    if (!problemStatementDisabled) {
      console.log('Problem Statement clicked!');
      navigate('/problem-statement');
    }
  };

  const handleWorkshopAreaClick = () => {
    navigate('/workshop-area');
  };

  const handleWorkingMaterialClick = () => {
    navigate('/working-material');
  };

  return (
    <div>
      <Navbar />
      <div className='d-container'>
        <section className={`d-box ${problemStatementDisabled ? 'disabled' : ''}`} onClick={handleProblemStatementClick}>
          <MDBIcon fas icon="file-code" className='d-icon' />
          <h3 className='d-head'>Problem Statement</h3>
        </section>
        <section className={`d-box ${workshopAreaDisabled ? 'disabled' : ''}`} onClick={handleWorkshopAreaClick}>
          <MDBIcon fas icon="puzzle-piece" className='d-icon' />
          <h3 className='d-head'>Workshop Area</h3>
        </section>
        <section className={`d-box ${workingMaterialDisabled ? 'disabled' : ''}`} onClick={handleWorkingMaterialClick}>
          <MDBIcon fas icon="book" className='d-icon' />
          <h3 className='d-head'>Working Material</h3>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
