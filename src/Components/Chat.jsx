import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('ClientUser'); // Replace with dynamic username

  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    // Get chat history
    newSocket.on('chat-history', (messages) => {
      setChat(messages);
    });

    // Cleanup the socket connection on component unmount
    return () => newSocket.close();
  }, []);

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      // Emit the message to the server
      socket.emit('message', { text: message, sender: username });
      setMessage(''); // Clear input
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '1rem', height: '300px', overflowY: 'scroll' }}>
        {chat.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}:</strong> {msg.text} <span>({new Date(msg.time).toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default Chat;
