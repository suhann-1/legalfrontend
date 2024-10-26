import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavigateHome = () => {
    navigate('/'); // Navigate to the home page (path '/')
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigateHome} // Call the navigation function
      >
        Go to Home
      </Button>
    </div>
  );
};

export default ExampleComponent;
