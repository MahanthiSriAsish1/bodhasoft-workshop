import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { MDBIcon } from 'mdb-react-ui-kit';
import '../Styles/Admin.css';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Admin = () => {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        if (!socket) {
            setSocket(io(process.env.REACT_APP_SOCKET_SERVER_URL));
        }

        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    const handleUnlock = (buttonType) => {
        if (socket) {
            // Emit a socket event based on button type
            if (buttonType === 'problemStatement') {
                socket.emit('unlockProblemStatement');
            } else if (buttonType === 'workshopArea') {
                socket.emit('unlockWorkshopArea');
            }
        } else {

        }
    };
    return (
        <div>
            <AdminNavbar />
            <div className='d-container'>
                <Link className='d-box' onClick={() => handleUnlock('problemStatement')}>
                    <section>
                        <center><MDBIcon fas icon="file-code" className='d-icon' /></center>
                        <h3 className='d-head'>Problem Statement</h3>
                    </section>
                </Link>
                <Link to='/Module' className='d-box' onClick={() => handleUnlock('workshopArea')}>
                    <section>
                        <center><MDBIcon fas icon="unlock" className='d-icon' /></center>
                        <h3 className='d-head'>Unlock Modules</h3>
                    </section>
                </Link>
            </div>
        </div>
    );
};

export default Admin;
