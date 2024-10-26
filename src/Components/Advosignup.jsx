import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CircularProgress, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomBox = styled(Box)({
  background: 'linear-gradient(135deg, #edf2ff, #e1e4ff)',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
});

const Advosignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    expertise: '',
    experience: null, 
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { name, email, password, confirmPassword, expertise, experience } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/advocate/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, expertise, experience }), // Include new fields
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage('Advocate profile created successfully!'); // Set success message
        setSnackbarOpen(true); // Open Snackbar
        setError('');
        setFormData({ name: '', email: '', password: '', confirmPassword: '', expertise: '', experience: null });
        setTimeout(() => {
          navigate('/login/advocate'); 
        }, 1000); // 2 seconds delay
      } else {
        setError(data.msg || 'Signup failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <CustomBox>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Advocate Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Full Name"
            name="name"
            value={name}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Area of Expertise"
            name="expertise"
            value={expertise}
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Experience (Years)"
            name="experience"
            value={experience}
            type='number'
            onChange={handleChange}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              mt: 2,
              mb: 2,
              padding: '10px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#303f9f' },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ my: 2 }}>
          Already have an account? <a href="/login/advocate">Log in</a>
        </Typography>
      </CustomBox>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Snackbar will auto hide after 6 seconds
        onClose={handleSnackbarClose}
        message={snackbarMessage} // Display the success message
      />
    </Container>
  );
};

export default Advosignup;
