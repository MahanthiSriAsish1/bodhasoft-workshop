import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../Styles/Dashboard.css';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import downloadPDF from '../service/adminService/downloadPdf';
import store from 'store2';


const Dashboard = ({ problemStatus, workshopAreaStatus }) => {
  const [problemStatementDisabled, setProblemStatementDisabled] = useState();
  const [workshopAreaDisabled, setWorkshopAreaDisabled] = useState();
  const [workingMaterialDisabled, setWorkingMaterialDisabled] = useState();

  const navigate = useNavigate();

  // Update state when props change
  useEffect(() => {
    setProblemStatementDisabled(problemStatus);
    setWorkshopAreaDisabled(workshopAreaStatus);
  }, [problemStatus, workshopAreaStatus]);

  const handleProblemStatementClick = () => {
    downloadPDF("Problem-Statement.pdf", "Problem-Statement.pdf");
  };

  const handleWorkshopAreaClick = () => {
    navigate('/workshop-area');
  };

  const handleWorkingMaterialClick = () => {
    downloadPDF("Workshop Material document.pdf", "BodhaSoft Material document.pdf");
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
