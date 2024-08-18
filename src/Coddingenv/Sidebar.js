import React from 'react';

const Sidebar = ({ questions, submissions, viewedQuestions, currentQuestion }) => {
  return (
    <div className="sidebar">
      <ul>
        {questions.map((question, index) => {
          let statusClass = '';
          if (submissions[question.id]) {
            statusClass = 'answered';
          } else if (viewedQuestions.has(question.id)) {
            statusClass = 'viewed';
          } else {
            statusClass = 'not-answered';
          }
          return (
            <li key={question.id} className={statusClass}>
              {index + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
