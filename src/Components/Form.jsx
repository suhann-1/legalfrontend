import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Form = ({ dialogOpen, setDialogOpen }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleRegister = async () => {
    const { name, phone, date, time } = formValues;

    // Basic validation
    if (!name || !phone || !date || !time) {
      setMessage('Please fill in all fields.');
      setSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/appoinment/create', {
        name,
        phone,
        date,
        time
      });
      if (response.data.message === 'Appointment booked successfully!') {
        setMessage('Appointment Booked successfully!');
        setSeverity('success');
      } else {
        setMessage('Appointment Booking failed. Please try again.');
        setSeverity('error');
      }
      
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Failed to register. Please try again later.');
      setSeverity('error');
    } finally {
      setSnackbarOpen(true);
    
      setFormValues({ name: '', phone: '', date: '', time: '' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TextField
            margin="normal"
            label="Name"
            fullWidth
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Phone Number"
            fullWidth
            value={formValues.phone}
            onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Appoinmentdate"
            type="date"
            fullWidth
            value={formValues.date}
            onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
          />
          <TextField
            margin="normal"
            label=" "
            type="time"
            fullWidth
            value={formValues.time}
            onChange={(e) => setFormValues({ ...formValues, time: e.target.value })}
          />
       
        
          <Button  color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Submit
          </Button>
      

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Form;
