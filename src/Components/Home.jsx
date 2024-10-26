import React from 'react';
import { Container, Button, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure the path is correct

const CustomBox = styled(Box)({
  background: 'linear-gradient(135deg, #edf2ff, #e1e4ff)',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const FeatureCard = styled(Box)(({ bgColor }) => ({
  background: bgColor || 'white',
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '1rem',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const features = [
  { title: "Recognized", description: "Recognized by Govt. of India", bgColor: '#ffebee' },
  { title: "Happy Customer", description: "1 Lakh+ Happy Customers Across India", bgColor: '#e3f2fd' },
  { title: "ISO", description: "ISO Certified", bgColor: '#e8f5e9' },
  { title: "Data Security", description: "Data Security & Trust", bgColor: '#fff3e0' },
  { title: "Experts", description: "Trained & Professional Experts", bgColor: '#fce4ec' },
  { title: "On Time", description: "On Time Service", bgColor: '#f1f8e9' },
  { title: "Quick", description: "Super Fast Service", bgColor: '#e1f5fe' },
  { title: "Users OLI", description: "Quick Response Team", bgColor: '#f0f4c3' },
  { title: "Affordable", description: "Affordable Than Other Professionals", bgColor: '#ffe0b2' },
];

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
      <CustomBox>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome to CaseMate-Legal Consultation App
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Are you a Client or an Advocate?
        </Typography>
        <Button
          component={Link}
          to="/signup/client"
          variant="contained"
          sx={{
            backgroundColor: '#3f51b5',
            color: 'white',
            mr: 2,
            padding: '10px 20px',
            '&:hover': { backgroundColor: '#303f9f' },
          }}
        >
          Client
        </Button>
        <Button
          component={Link}
          to="/signup/advocate"
          variant="contained"
          sx={{
            backgroundColor: '#3f51b5',
            color: 'white',
            padding: '10px 20px',
            '&:hover': { backgroundColor: '#303f9f' },
          }}
        >
          Advocate
        </Button>
      </CustomBox>

      <Box sx={{ marginTop: '4rem', textAlign: 'center' }}>
        <Typography variant="h5" color='white' sx={{ mb: 3 }}>
          Why Us?
        </Typography>
        <Grid container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard bgColor={feature.bgColor}>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography>{feature.description}</Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
