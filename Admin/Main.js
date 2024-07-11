// import React, { useState, useEffect } from 'react';
// import './App.css'; // Make sure to import the CSS file
// import Intro from './components/Intro';
// import About from './components/About';
// import Services from './components/Service';
// import Achivements from './components/Achivements';
// import Skills from './components/Skills';
// import Hireme from './components/Hireme';
// import Resume from './components/Resume';
// import Project from './components/Project';
// import Work from './components/works';
// import Contact from './components/Contact';
// import Blogs from './components/Blog';

// const ScrollspyNavbar = ({ links, isNavbarVisible, toggleNavbar }) => {
//   const [activeLink, setActiveLink] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       let currentActiveLink = null;
//       let currentPosition = window.pageYOffset;

//       links.forEach(({ id, offset }) => {
//         const element = document.getElementById(id);
//         if (element) {
//           const elementPosition = element.offsetTop - offset;
//           if (currentPosition >= elementPosition && (!currentActiveLink || elementPosition > document.getElementById(currentActiveLink.id).offsetTop - offset)) {
//             currentActiveLink = { id, offset };
//           }
//         }
//       });

//       setActiveLink(currentActiveLink);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [links]);

//   return (
//     <>
//       <div className="navbar-toggle" onClick={toggleNavbar}>
//         &#9776; {/* Unicode character for hamburger menu */}
//       </div>
//       <nav className={`navbar2 ${isNavbarVisible ? 'visible' : ''}`}>
//         <ul>
//           {links.map(({ id, label }) => (
//             <li key={id} className={activeLink?.id === id ? 'active' : ''}>
//               <a href={`#${id}`} onClick={() => toggleNavbar(false)}>{label}</a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// };

// const App = () => {
//   const [isNavbarVisible, setIsNavbarVisible] = useState(false);

//   const toggleNavbar = () => {
//     setIsNavbarVisible(!isNavbarVisible);
//   };

//   const links = [
//     { id: 'section1', label: 'Section 1', offset: 0 },
//     { id: 'section2', label: 'Section 2', offset: 50 },
//     { id: 'section3', label: 'Section 3', offset: 50 },
//     { id: 'section4', label: 'Section 4', offset: 50 },
//     { id: 'section5', label: 'Section 5', offset: 50 },
//   ];

//   return (
//     <div className='mainbody'>
//       <div className='navbar' style={{boxShadow:'none'}}>
//         <div className='navbar1'>
//           <h1>Rajiv</h1>
//         </div>
//         <ScrollspyNavbar links={links} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />
//       </div>
//       <section id="section1" className='bg1'>
//        <Intro/>

//         {/* Content for Section 1 */}
//       </section>

//       <section id="section2">
//         <About/>
//         <Services/>
//         {/* <Achivements/> */}
//       </section>

//       <section id="section3">
//        <Skills/>
//        <Resume/>
     
//       </section>

//       <section id="section4" >
       
//         <Work/>
//         <Hireme/>
//       </section>

//       <section id="section5">
//       <Blogs/>
//       <Contact/>
//       </section>
//     </div>
//   );
// };

// export default App;




import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import UnlockProblems from './Unlock-problems';
import ModuleUnlock from './ModuleUnlock';



const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/Problems" element={<UnlockProblems />} />
      <Route path="/Module" element={<ModuleUnlock/>} />
    </Routes>
  );
};

export default Main;
