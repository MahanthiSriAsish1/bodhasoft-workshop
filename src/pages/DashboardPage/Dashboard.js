// Dashboard.js
import React from 'react';
import Navbar from '../../Components/Dashboard components/navbar';
import MyCard from '../../Components/Dashboard components/card';
import Container from '@mui/material/Container';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 30%', margin: '10px' }}>
            <MyCard 
              title="Problem Statement" 
              description=""
            />
          </div>
          <div style={{ flex: '1 1 30%', margin: '10px' }}>
            <MyCard 
              title="Workshop Area" 
              description=""
            />
          </div>
          <div style={{ flex: '1 1 30%', margin: '10px' }}>
            <MyCard 
              title="Workshop Material" 
              description=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
