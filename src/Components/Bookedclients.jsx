import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Container, Grid } from '@mui/material';

const BookedClients = () => {
    const [message, setMessage] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            const advocate = localStorage.getItem('advocate');
            const id = JSON.parse(advocate)._id;
console.log(id)
            try {
                const response = await axios.get(`http://localhost:5000/api/viewappo/clients?id=${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setAppointments(response.data.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    const handleAccept = () => {
        setMessage('Accepted');
      };
    
      const handleReject = () => {
        setMessage('Rejected');
      };
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
                                    <Typography variant="h6">{appointment.clientName}</Typography>
                                    <Typography variant="body2"> {appointment.clientEmail}</Typography>
                                    <Typography variant="body2">
                                        Appointment Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">Status: {appointment.status}</Typography>
                                    <button onClick={handleAccept} style={{ marginRight: '10px' }}>Accept</button>
<button onClick={handleReject}>Reject</button>

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
