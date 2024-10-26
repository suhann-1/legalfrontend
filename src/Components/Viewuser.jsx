import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Viewuser = () => {
    const [user, setUsers] = useState([]);

    // Delete user function
    const deleteUser = (_id) => {
        let input = { "_id": _id };
        axios.post("http://localhost:5000/api/userdlt/delete", input)  // Corrected route
            .then((response) => {
                console.log("Delete response:", response.data); 
                if (response.data.status === "success") {
                    alert("User deleted"); 
                    setUsers(prevData => prevData.filter(user => user._id !== _id));
                } 
            })
            .catch((error) => {
                console.error("Error deleting user:", error); 
                alert("Could not delete user. Please try again later.");
            });
    };

    // Fetch users function
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/userview/view");  // Corrected route
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Could not fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={styles.pageStyle}>
            <h1 style={styles.title}>View All Users</h1>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Name</th>
                            <th style={styles.tableHeader}>Email</th>
                            <th style={styles.tableHeader}>Phone No</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user) => (
                            <tr key={user._id}>
                                <td style={styles.tableData}>{user.fullName}</td>
                                <td style={styles.tableData}>{user.email}</td>
                                <td style={styles.tableData}>{user.phone}</td>
                                <td>
                                    <button 
                                        style={styles.deleteButton} 
                                        onClick={() => { deleteUser(user._id) }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const styles = {
    pageStyle: {
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/010/927/076/original/justice-and-law-concept-male-judge-in-a-courtroom-on-wooden-table-and-counselor-or-male-lawyer-working-in-office-legal-law-advice-and-justice-concept-free-video.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        padding: '20px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        margin: '20px 0',
    },
    tableContainer: {
        overflowX: 'auto',
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    tableData: {
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Viewuser;
