import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import bell from './bell.png';
import profile from './profile.png'
export default function Profile() {
  return (
    <MDBDropdown>
              <img src={bell} className='icon1'/>

      <MDBDropdownToggle tag='a' className='button'>
        <img src={profile} className='icon2'/>
      {/* <span className='username'> Username</span> */}
      </MDBDropdownToggle>
      <MDBDropdownMenu style={{ width: '300px' }} light>
      <MDBListGroup >
        <div className='profilebackground'> 
          <center><h3 className='p-head'>Profile</h3>
          <img src={profile}/>
          </center>
        </div>
     <div className='details'>
     <MDBListGroupItem><MDBIcon far icon="user-circle" />&nbsp;&nbsp;Name</MDBListGroupItem>
     <MDBListGroupItem><MDBIcon fas icon="users-cog" />&nbsp;Bacth</MDBListGroupItem>
     <MDBListGroupItem><MDBIcon fas icon="trophy" />&nbsp;Test results</MDBListGroupItem>
     <MDBListGroupItem><MDBIcon far icon="file-alt" />&nbsp;&nbsp;&nbspPrevious answer sheets</MDBListGroupItem>

     </div>
      <MDBListGroupItem style={{backgroundColor:' rgba(131, 91, 199, 1)', color:'whitesmoke', textAlign:'center'}}><MDBIcon fas icon="sign-out-alt" /> Logout</MDBListGroupItem>
    </MDBListGroup>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}