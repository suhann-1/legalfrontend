import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import './chat.css';

const socket = io('http://localhost:5000'); // Ensure this is your backend server URL

function Chat({ roomId, user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join_room', roomId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/messages/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const messageData = {
      roomId,
      sender: user,
      content: message,
      timestamp: new Date()
    };

    socket.emit('send_message', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage('');

    axios.post('http://localhost:5000/api/chat/sendMessage', messageData)
      .catch((error) => console.error('Error saving message:', error));
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user ? 'own-message' : 'other-message'}`}>
            <p><strong>{msg.sender}:</strong> {msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
