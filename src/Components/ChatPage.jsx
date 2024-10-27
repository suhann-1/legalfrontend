import React from 'react';
import Chat from './Chat';

function ChatPage() {
  const roomId = "unique_room_id"; // Replace with actual room logic
  const user = "User1"; // Replace with actual user

  return (
    <div>
      <h2>Chat Room</h2>
      <Chat roomId={roomId} user={user} />
    </div>
  );
}

export default ChatPage;
