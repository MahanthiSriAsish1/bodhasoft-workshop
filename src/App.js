import { useState } from 'react';
import './App.css';

import Login from './Components/Login';
import Workshop from './Components/Workshop';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

function App() {
  const [authentication, setAuthentication] = useState(true); // Set to false for testing purposes

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setAuthentication={setAuthentication} />} />
          <Route
            path="/dashboard"
            element={authentication ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path='workshop-area' element={<Workshop/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
