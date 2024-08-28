import React, { useState, useEffect } from 'react';
import './styles/Maintable.css'; // Ensure you have a CSS file for styling
import man from "./man.png"
// TableRow component for displaying individual rows
const TableRow = ({ name, email }) => (
  <tr >
    <td><img src={man} className='manlogo'/></td>
    <td>{name}</td>
    <td>{email}</td>
  </tr>
);

// RequestTable component for displaying each request table
const RequestTable = ({ title, items }) => (
  <div className="request-table-container">
    <h2>{title}</h2>
    <table className="request-table">
      <tbody>
        {items.slice(0, 5).map((item) => (
          <TableRow key={item.name} name={item.name} email={item.email} />
        ))}
      </tbody>
    </table>
  </div>
);

// Main App component
export default function MainTable() {
  // Dummy data for Mentor Requests
  const [mentorRequests, setMentorRequests] = useState([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Michael Johnson", email: "michael@example.com" },
    { name: "Emily Davis", email: "emily@example.com" },
    { name: "David Wilson", email: "david@example.com" },
    { name: "Sophia Taylor", email: "sophia@example.com" },
    { name: "Daniel Moore", email: "daniel@example.com" },
  ]);

  // Dummy data for Mock Interview Requests
  const [mockInterviewRequests, setMockInterviewRequests] = useState([
    { name: "Alice Brown", email: "alice@example.com" },
    { name: "Robert Jones", email: "robert@example.com" },
    { name: "Olivia Garcia", email: "olivia@example.com" },
    { name: "James Miller", email: "james@example.com" },
    { name: "Isabella Martinez", email: "isabella@example.com" },
    { name: "Ethan Rodriguez", email: "ethan@example.com" },
    { name: "Charlotte Hernandez", email: "charlotte@example.com" },
  ]);

  // Fetch data dynamically (this part will not be used with dummy data but kept for future reference)
  useEffect(() => {
    const fetchMentorRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentor-requests'); // Replace with your API URL
        const data = await response.json();
        setMentorRequests(data);
      } catch (error) {
        console.error('Error fetching mentor requests:', error);
      }
    };

    const fetchMockInterviewRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mock-interview-requests'); // Replace with your API URL
        const data = await response.json();
        setMockInterviewRequests(data);
      } catch (error) {
        console.error('Error fetching mock interview requests:', error);
      }
    };

    // Comment out these fetch calls when using dummy data
    // fetchMentorRequests();
    // fetchMockInterviewRequests();
  }, []);

  return (
    <div className="requests">
      <div className='requestbox'>
     <RequestTable title="Mentor Requests" items={mentorRequests}  />
      </div>
      <div className='requestbox'>
      <RequestTable title="Mock Interview Requests" items={mockInterviewRequests} />
      </div>
    </div>
  );
}
