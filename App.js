import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon
} from 'mdb-react-ui-kit';
import './components/style.css'

import logo from './components/bodhasoft-logo.png'
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Webdeployment from './components/Webdeployment';
export default function App() {
  const [verticalActive, setVerticalActive] = useState('tab1');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>


      {/*  Navbar component   */}
      <Navbar />

      {/* Toggle button to collapse sidebar */}
      <MDBRow>
        {/* Sidebar column - conditional rendering for collapsible sidebar */}
        {!isSidebarCollapsed && (
          <MDBCol size='12' md='3' className='mb-3'>
            <MDBTabs className='flex-column text-center'>
              <MDBTabsItem>
                <p className='homebtn'
                  onClick={() => handleVerticalClick('tab1')}
                  active={verticalActive === 'tab1'}
                >
                  <MDBIcon fas icon="home" /> Home
                </p>
              </MDBTabsItem>
              <MDBTabsItem>
                <p className='options'
                  onClick={() => handleVerticalClick('tab2')}
                  active={verticalActive === 'tab2'}
                >
                  workshop Functions
                </p>
              </MDBTabsItem>
              <MDBTabsItem>
                <p className='options'
                  onClick={() => handleVerticalClick('tab3')}
                  active={verticalActive === 'tab3'}
                >
                  Website Deployment
                </p>
              </MDBTabsItem>
            </MDBTabs>
          </MDBCol>
        )}

        {/* Content column */}
        <MDBCol size={isSidebarCollapsed ? '12' : '12'} md={isSidebarCollapsed ? '12' : '9'} style={{ backgroundColor: "rgba(137, 43, 226, 0.038)", height: '100vh' }}>
          <MDBTabsContent >
            <strong color='primary' className='clik' onClick={toggleSidebar}>
              {isSidebarCollapsed ? <MDBIcon fas icon="bars" /> : <MDBIcon fas icon="angle-double-left" />}
            </strong>

            {/* routing for sidebar elemnts  */}
            <MDBTabsPane open={verticalActive === 'tab1'}> <Admin /> </MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab2'} style={{ marginTop: "20px" }}> {/* add component  */} hello</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab3'}> <Webdeployment /> </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>


    </>
  );
}
