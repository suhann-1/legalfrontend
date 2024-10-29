import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdvocateProfile = () => {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/advocatelist');
        setAdvocates(response.data);
      } catch (err) {
        console.error('Error fetching advocates:', err);
        setError('Failed to fetch advocates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  const handleBookAppointment = (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Advocate Profiles
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={3}>
            {advocates.map((advocate) => (
              <Grid item xs={12} sm={6} md={4} key={advocate._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {advocate.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Experience: {advocate.experience} years
                    </Typography>
                    <Typography color="textSecondary">
                      Area of Expertise: {advocate.expertise}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookAppointment(advocate._id)} // Wrap in arrow function
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default AdvocateProfile;