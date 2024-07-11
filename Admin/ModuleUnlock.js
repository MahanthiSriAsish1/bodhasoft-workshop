import React, { useState } from 'react';
import Navbar from '../bodha/Navbar';
import { MDBIcon } from 'mdb-react-ui-kit';
import './Admin.css';

const ModuleUnlock = () => {
  const [modules, setModules] = useState([
    { id: 1, name: 'Module 1', isUnlocked: false },
    { id: 2, name: 'Module 2', isUnlocked: false },
    { id: 3, name: 'Module 3', isUnlocked: false },
    { id: 4, name: 'Module 4', isUnlocked: false },
    { id: 5, name: 'Module 5', isUnlocked: false },
    { id: 6, name: 'Module 6', isUnlocked: false },
  ]);

  const handleToggleLock = (moduleId) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId ? { ...module, isUnlocked: !module.isUnlocked } : module
      )
    );
    alert(`Module ${moduleId} has been ${modules.find(module => module.id === moduleId).isUnlocked ? 'locked' : 'unlocked'}!`);
  };

  return (
    <>
      <Navbar />
      <center>
        <div className="um-container">
          {modules.map((module) => (
            <div key={module.id} className="um-box">
              <section className="um-head">{module.name}</section>
              <section className="um-unlock">
                <button
                  className={`normal-button ${module.isUnlocked ? "unlocked" : "locked"}`}
                  onClick={() => handleToggleLock(module.id)}
                >
                 
                  {module.isUnlocked ? "Locked  " : "Unlocked "}
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
