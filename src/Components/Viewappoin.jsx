import React, { useEffect, useState } from 'react';

const Viewappoin = () => {
    const [appointments, setAppointments] = useState([]);
    const [clients, setClients] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            let advocate = localStorage.getItem('advocate');
            let id = JSON.parse(advocate)._id;
            try {
                const response = await fetch('http://localhost:5000/api/appoinment/list')
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Your Appointments</h1>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            Date: {appointment.date} | Status: {appointment.status} | 
                            Client: {appointment.clientId || 'Loading...'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available</p>
            )}
        </div>
    );
};

export default Viewappoin;