import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import AdminNavbar from './AdminNavbar';
import { MDBIcon } from 'mdb-react-ui-kit';
import '../Styles/Admin.css';

const ModuleUnlock = () => {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        if (!socket) {
            setSocket(io(process.env.REACT_APP_SOCKET_SERVER_URL));
        }

        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    const [modules, setModules] = useState([
        { id: 1, name: 'Module 1', isUnlocked: false },
        { id: 2, name: 'Module 2', isUnlocked: false },
        { id: 3, name: 'Module 3', isUnlocked: false },
        { id: 4, name: 'Module 4', isUnlocked: false },
        { id: 5, name: 'Module 5', isUnlocked: false },
    ]);

    const handleUnlock2 = (questionId) => {
        if (socket) {
            socket.emit('unlockQuestion', { questionId });
            setModules((prevModules) =>
                prevModules.map((module) =>
                  module.id === questionId ? { ...module, isUnlocked: !module.isUnlocked } : module
                )
              );
        } else {
        }
    };

    return (
        <>
            <center className="um-parent">
                <AdminNavbar />
                <div className="um-container">
                    {modules.map((module) => (
                        <div key={module.id} className="um-box">
                            <section className="um-head">{module.name}</section>
                            <section className="um-unlock">
                                <button
                                    className={`normal-button ${module.isUnlocked ? "unlocked" : "locked"}`}
                                    onClick={() => handleUnlock2(module.id)}
                                >

                                    {module.isUnlocked ? "UnLocked  " : "locked "}
                                    <MDBIcon fas icon={module.isUnlocked ? "lock " : "unlock "} className="button-icon" />
                                </button>
                            </section>
                        </div>
                    ))}
                </div>
            </center>
        </>
    );
};

export default ModuleUnlock;