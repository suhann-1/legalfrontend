// src/components/BookedClients.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Container, Grid } from '@mui/material';

const BookedClients = ({ advocateId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            let advocate = localStorage.getItem('advocate');
            let id = JSON.parse(advocate)._id;
            
            try {
                // Fetch appointments from the backend for the specific advocate
                const response = await axios.get(`http://localhost:5000/api/viewappo/clients?id=${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'), // Replace with your valid JWT token
                    },
                });
                console.log('Fetched Appointments:', response.data); // Log fetched appointments for debugging
                setAppointments(response.data);
            } catch (err) {
                console.error(err); // Log the error for debugging
                setError('Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [advocateId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Clients Who Booked Appointments
            </Typography>
            <Grid container spacing={2}>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Grid item xs={12} sm={6} md={4} key={appointment._id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{appointment.clientId.fullName}</Typography> {/* Display client name */}
                                    <Typography variant="body2">Email: {appointment.clientId.email}</Typography> {/* Display client email */}
                                    <Typography variant="body2">
                                        Appointment Date: {new Date(appointment.date).toLocaleDateString()} {/* Adjust date format */}
                                    </Typography>
                                    <Typography variant="body2">Status: {appointment.status}</Typography> {/* Display appointment status */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No clients have booked appointments yet.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default BookedClients;
