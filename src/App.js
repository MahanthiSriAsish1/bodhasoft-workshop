import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './App.css';
import Login from './Components/Login';
import Workshop from './Components/Workshop';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Admin from "./Components/Admin";
import ModuleUnlock from "./Components/ModuleUnlock";
import store from 'store2';


function App() {
  const [authentication, setAuthentication] = useState(false);
  const [message, setMessage] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [problemStatus, setProblemStatus] = useState(true)
  const [workshopareaStatus, setWorkshopAreaStatus] = useState(true)
  const [socket, setSocket] = useState(null);

  function setItemWithExpiry(key, value, ttl) {
    store.set(key, value, new Date().getTime() + ttl);
  }




  useEffect(() => {
    const isAuthenticated = localStorage.getItem('loginAuthenticated');
    if (isAuthenticated) {
      setAuthentication(isAuthenticated);
    }
    const result1 = localStorage.getItem('ProblemStatementUnlocked')
    const result2 = localStorage.getItem('WorkshopAreaUnlocked')

    if (result1) {
      setProblemStatus(false)
    }

    if (result2) {
      setWorkshopAreaStatus(false)
    }
  }, []);


  useEffect(() => {
    if (!socket) {
      setSocket(io(process.env.REACT_APP_SOCKET_SERVER_URL));
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    // Set up event listeners
    socket.on("connect", () => {
    });

    socket.on("disableProblemStatement", () => {
      setProblemStatus(true);
    });

    socket.on("enableProblemStatement", () => {
      setProblemStatus(false);
      setItemWithExpiry("ProblemStatementUnlocked", true, 86400000)
    });

    socket.on("disableWorkshopArea", () => {
      setWorkshopAreaStatus(true);
    });

    socket.on("enableWorkshopArea", () => {
      setWorkshopAreaStatus(false);
      setItemWithExpiry("WorkshopAreaUnlocked", true, 86400000)
    });

    socket.on("messageFromServer", (data) => {
      setMessage(data.message);
    });

    socket.on("broadcastMessage", (data) => {
      setBroadcastMessage(data.message);
    });

    socket.on("newMessage", (data) => {
      setNewMessage(data.message);
    });

    socket.on("disconnect", () => {
    });

    // Cleanup function to remove event listeners
    return () => {
      socket.off("connect");
      socket.off("disableProblemStatement");
      socket.off("enableProblemStatement");
      socket.off("disableWorkshopArea");
      socket.off("enableWorkshopArea");
      socket.off("messageFromServer");
      socket.off("broadcastMessage");
      socket.off("newMessage");
      socket.off("disconnect");
    };
  }, [socket]); // Dependency array, effect runs when 'socket' changes


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={authentication ? <Dashboard problemStatus={problemStatus} workshopAreaStatus={workshopareaStatus} /> : <Login setAuthentication={setAuthentication} />} />
          <Route
            path="/dashboard"
            element={authentication ? <Dashboard problemStatus={problemStatus} workshopAreaStatus={workshopareaStatus} /> : <Navigate to="/" />}
          />
          <Route
            path='/workshop-area'
            element={authentication ? <Workshop /> : <Navigate to="/" />}
          />
          <Route path='/61a6Fb67c50d6E4g61h65i6Cj69k' element={<Admin />} />
          <Route path='/Module' element={<ModuleUnlock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
