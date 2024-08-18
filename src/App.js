
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./Dashboard/Dashboard";
import Questions from "./Coddingenv/Question";
import Mcqquestions from "./Coddingenv/Mcqquestions";
import TRtestpage from "./TRtest/TRtestpage";
import Registration from "./components/Registerpage";

function App() {
  return (
    <BrowserRouter>
 <Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/signup" element={<Registration/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/mcqtest" element={<Mcqquestions/>}/>
  <Route path="/codingtest" element={<Questions/>}/>
  <Route path="/trtest" element={<TRtestpage/>}/>
  </Routes>
 </BrowserRouter>
   
  );
}

export default App;
