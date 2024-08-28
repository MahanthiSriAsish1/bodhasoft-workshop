import React, { useState } from 'react';
import axios from 'axios';
import "./styles/notifications.css"
function NotificationContent() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!title.trim() || !content.trim()) {
            setError("Both fields must be filled out");
            return;
        }

        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        try {
            const response = await axios.post("http://localhost:8080/api/notifications/send", {
                title,
                content,
                date: formattedDate
            });

            console.log(response.data);
            setSuccessMessage('Notification sent successfully');
            setTitle('');
            setContent('');
        } catch (err) {
            console.error('Error sending notification:', err);
            if (err.response) {
                setError(err.response.data.message || 'Failed to send notification. Please try again later.');
            } else if (err.request) {
                setError('No response from the server. Please check your network connection.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <>
        <div className="center">
            <h2 style={{color:"#BB2CD9"}}>Create Notification</h2>
            <form onSubmit={handleSubmit} className='notificationform'>
                <div className="flex-column">
                    <label htmlFor="title" className='n-label'>Title:</label>
                    <input
                        type="text"
                        id="title"
                        className='n-input'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="content"  className='n-label'>Content:</label>
                    <textarea
                        id="content"
                        className='n-textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
        
                <button className='submitbtn' type="submit">Submit</button>
            </form>
        </div>
    </>);
}

export default NotificationContent;
