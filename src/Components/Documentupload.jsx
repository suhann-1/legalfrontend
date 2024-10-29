import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';

const Documentupload = () => {
  const [document, setDocument] = useState(null);
  const [clientId, setClientId] = useState('');
  const [advocateId, setAdvocateId] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!document) {
      setMessage('Please select a document to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', document);
    formData.append('clientId', clientId);
    formData.append('advocateId', advocateId);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setDocument(null);
      setClientId('');
      setAdvocateId('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading document:', error);
      setMessage('Error uploading document. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h5">Upload Document</Typography>
      <TextField
        label="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Advocate ID (optional)"
        value={advocateId}
        onChange={(e) => setAdvocateId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: '20px' }}>
        Upload Document
      </Button>
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  );
};

export default Documentupload;
