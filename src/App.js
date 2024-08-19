
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./Dashboard/Dashboard";
import Questions from "./Coddingenv/Question";
import Mcqquestions from "./Coddingenv/Mcqquestions";
import TRtestpage from "./TRtest/TRtestpage";
import Registration from "./components/Registerpage";
import MCQinstruction from "./Coddingenv/MCQinstruction";
import Codingtestinstruction from "./Coddingenv/Codingtestinstruction";

function App() {
  return (
    <BrowserRouter>
 <Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/signup" element={<Registration/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/mcqtest" element={<MCQinstruction/>}/>
  <Route path="/codingtest" element={<Codingtestinstruction/>}/>
  <Route path="/trtest" element={<TRtestpage/>}/>
  <Route path="/mcqtest-instructions" element={<Mcqquestions/>}/>
  <Route path="/codetest-instructions" element={<Questions/>}/>
  </Routes>
 </BrowserRouter>
  //  <MCQinstruction/>
  );
}

export default App;
