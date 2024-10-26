import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Button,
    TextField,
    Snackbar,
    Alert,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users'); // Adjust the endpoint as necessary
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin', newUser);
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            fetchUsers(); // Refresh user list
            setNewUser({ username: '', email: '', password: '', role: 'user' }); // Reset form
        } catch (error) {
            console.error('Error adding user:', error);
            setSnackbarMessage('Failed to add user.');
            setSnackbarOpen(true);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete('http://localhost:5000/api/admin');
            setSnackbarMessage('User deleted successfully');
            setSnackbarOpen(true);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error deleting user:', error);
            setSnackbarMessage('Failed to delete user.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin User Management
            </Typography>

            <Typography variant="h6" gutterBottom>
                Add User
            </Typography>
            <TextField
                label="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddUser}>
                Add User
            </Button>

            <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
                Users List
            </Typography>
            <List>
                {users.map((user) => (
                    <ListItem key={user._id}>
                        <ListItemText primary={user.username} secondary={user.email} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Admin;
