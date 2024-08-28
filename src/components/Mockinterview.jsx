import React, { useState, useEffect } from 'react';
import './styles/mentorrequest.css';
import { FaRegUserCircle } from 'react-icons/fa';
import man from './man.png'
// AccordionItem component
const AccordionItem = ({ name, email, request, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => onToggle(name)}>
     <div > <img className='manlogo' src={man}/></div>
     <div>{name}</div>
     <div> {email}</div>  
      </div>
      {isOpen && <div className="accordion-content">{request}</div>}
    </div>
  );
};

// Main App component
export default function Mockinterviewrequest() {
  const [accordionItems, setAccordionItems] = useState([
    { "name": "name1", "email": "email1@example.com", "request": "Request content for item 1" },
    { "name": "name2", "email": "email2@example.com", "request": "Request content for item 2" },
    { "name": "name3", "email": "email3@example.com", "request": "Request content for item 3" },
    { "name": "name4", "email": "email3@example.com", "request": "Request content for item 3" },
    { "name": "name5", "email": "email2@example.com", "request": "Request content for item 2" },
    { "name": "name6", "email": "email3@example.com", "request": "Request content for item 3" },
    { "name": "name7", "email": "email1@example.com", "request": "Request content for item 1" },
    { "name": "name8", "email": "email2@example.com", "request": "Request content for item 2" },
    { "name": "name9", "email": "email3@example.com", "request": "Request content for item 3" },
    { "name": "name10", "email": "email1@example.com", "request": "Request content for item 1" },
  ]);
  const [activeName, setActiveName] = useState(null);
  useEffect(() => {
    const fetchAccordionItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accordion-items'); // Update with your API URL
        const data = await response.json();
        setAccordionItems(data);
      } catch (error) {
        console.error('Error fetching accordion items:', error);
      }
    };

    fetchAccordionItems();
  }, []);

  const toggleAccordion = (name) => {
    setActiveName((prevActiveName) => (prevActiveName === name ? null : name));
  };

  return (
    <div className="accordion">
      {accordionItems.map(item => (
        <AccordionItem
          key={item.name}
          name={item.name}
          email={item.email}
          request={item.request}
          isOpen={activeName === item.name}
          onToggle={toggleAccordion}
        />
      ))}
    </div>
  );
}
