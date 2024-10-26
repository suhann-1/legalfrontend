import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography } from '@mui/material'; // Importing MUI components
import Calendar from 'react-calendar'; // Importing the Calendar component
import 'react-calendar/dist/Calendar.css'; // Importing Calendar CSS

const ClientProfile = () => {
    const [date, setDate] = useState(new Date()); // State for the selected date

    return (
        <div className="container mt-5">
            <header className="mb-4">
                <h1 className="text-primary" color='white'>My Profile</h1>
            </header>

            <div className="row">
                <nav className="col-md-3">
                    <ul className="nav flex-column">
                        
                        <li className="nav-item">
                            <a className="nav-link text-info" href="/advocates">Explore Advocates</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-warning" href="/chat" >Chat here</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-success" aria-current="page" href="/" color='blue'>LogOut</a>
                        </li>
                    </ul>
                </nav>

                <main className="col-md-9">
                    
                    <Box sx={{ marginTop: '2rem' }}>
                        <Typography variant="h6" color='white'>MY CALENDAR</Typography>
                        <Calendar
                            onChange={setDate} // Update the date state on change
                            value={date} // Controlled component for date
                            style={{ backgroundColor: '#fff', color: '#000' }} // Optional styling
                        />
                        <Typography variant="body1" style={{ marginTop: '1rem' }}color='white'>
                            Selected Date: {date.toDateString()}
                        </Typography>
                    </Box>
                </main>
            </div>
        </div>
    );
};

export default ClientProfile;
