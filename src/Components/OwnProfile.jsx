import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const OwnProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { advocate } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: advocate?.name || '',
    email: advocate?.email || '',
    expertise: advocate?.expertise || '',
    experience: advocate?.experience || '',
  });

  if (!advocate) {
    return <Typography variant="h6">No advocate data available</Typography>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const gotoAppointment = () => {
    navigate('/viewappo');
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // TODO: Add save logic, e.g., sending the updated data to the server
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calendar rendering logic
  const renderCalendar = () => {
    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentMonth = new Date();
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let date = 1; date <= lastDateOfMonth; date++) {
      calendarDays.push(
        <div key={date} className="calendar-day">
          {date}
        </div>
      );
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <h2>{currentMonth.toLocaleString('default', { month: 'long' })} {year}</h2>
        </div>
        <div className="calendar-grid">
          {daysInWeek.map((day, index) => (
            <div key={index} className="calendar-day header">
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      </div>
    );
  };

  // Add chat navigation
  const gotoChat = () => {
    navigate('/chat/:roomId');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
      <Card sx={{ maxWidth: 400, margin: '0 auto', backgroundColor: '#1e1e1e', color: 'white' }}>
        <CardMedia
          component="img"
          height="200"
          image="C:\Users\hisham\Downloads\default.jpg" // Add a profile picture here if needed, or use a placeholder image
          alt="Advocate Profile"
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          {isEditing ? (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label="Area of Expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h6">Name: {advocate.name}</Typography>
              <Typography variant="body1">Email: {advocate.email}</Typography>
              <Typography variant="body1">Area of Expertise: {advocate.expertise}</Typography>
              <Typography variant="body1">Experience: {advocate.experience} years</Typography>
              <Button variant="outlined" color="secondary" onClick={handleEditClick} sx={{ marginTop: '1rem' }}>
                Edit Profile
              </Button>
               <Button variant="outlined" color="secondary" sx={{ marginTop: '1rem', marginLeft: '1rem' }} onClick={gotoAppointment}>
                View Appointments
              </Button> 
              <Button variant="outlined" color="secondary" sx={{ marginTop: '1rem', marginLeft: '1rem' }} onClick={gotoChat}>
                Chat
              </Button>
            </>
          )}
          {renderCalendar()} {/* Call the function to render the calendar */}
        </CardContent>
      </Card>

      <style jsx>{`
        .calendar {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #1e1e1e;
          color: white;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 2rem;
        }

        .calendar-header {
          margin-bottom: 1rem;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }

        .calendar-day {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #282828;
          border-radius: 5px;
        }

        .calendar-day.empty {
          background-color: transparent;
        }

        .calendar-day.header {
          font-weight: bold;
          background-color: #444;
        }
      `}</style>
    </Container>
  );
};

export default OwnProfile;
