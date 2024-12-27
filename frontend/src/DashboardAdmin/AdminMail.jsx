import React, { useEffect, useState } from 'react';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminMail.css';

const AdminMail = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetch('/emails')
            .then(response => response.json())
            .then(data => setEmails(data))
            .catch(error => console.error('Error fetching emails:', error));
    }, []);

    return (
        <div className='MainAdmin'>
            <AdminNav />
            <AdminMainNav />

            <div className="mail-card">
                <div className="mail-main">
                    <h2>Emails from Blood Connect</h2>
                    {emails.length === 0 ? (
                        <p>No emails found.</p>
                    ) : (
                        <ul>
                            {emails.map((email, index) => (
                                <li key={index}>
                                    <p><strong>Subject:</strong> {email.subject}</p>
                                    <p><strong>From:</strong> {email.from}</p>
                                    <p><strong>Snippet:</strong> {email.snippet}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminMail;
