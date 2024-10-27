import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ClientProfile = () => {
    const location = useLocation();
    const { client } = location.state || {}; // Accessing client data passed from previous component

    const [date, setDate] = useState(null); // State for the selected date
    const [formData, setFormData] = useState({
        name: client?.name ,
        email: client?.email 
    });

    return (
        <div className="container mt-5">
            <header className="mb-4">
                <h1 className="text-primary">My Profile</h1>
            </header>
            
            <Typography variant="h6">Name: {formData.name}</Typography>
            <Typography variant="body1">Email: {formData.email}</Typography>
            
            <div className="row">
                <nav className="col-md-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link text-info" href="/advocates">Explore Advocates</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-warning" href="/chat/:roomId">Chat here</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-success" aria-current="page" href="/">LogOut</a>
                        </li>
                    </ul>
                </nav>

                <main className="col-md-9">
                    <Box sx={{ marginTop: '2rem' }}>
                        <Typography variant="h6">MY CALENDAR</Typography>
                        <Calendar
                            onChange={setDate} // Update the date state on change
                            value={date} // Controlled component for date
                        />
                        <Typography variant="body1" style={{ marginTop: '1rem' }}>
                            Selected Date: {date ? date.toDateString() : 'No date selected'}
                        </Typography>
                    </Box>
                </main>
            </div>
        </div>
    );
};

export default ClientProfile;
