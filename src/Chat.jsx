import React, { useState, useEffect } from 'react';
import { rooms, users } from './data';
console.log(rooms)
class Message {
  constructor(text) {
    this.text = text;
    this.encryptedText = null;
  }

  encrypt(encryptionKey) {
    this.encryptedText = this.text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + encryptionKey) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + encryptionKey) % 26) + 97);
        } else {
          return char;
        }
      })
      .join('');
    return this.encryptedText;
  }

  decrypt(encryptionKey) {
    return this.encryptedText
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 - encryptionKey + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 - encryptionKey + 26) % 26) + 97);
        } else {
          return char;
        }
      })
      .join('');
  }
}

const Chat = ({ chosenRoom = "Room1" }) => {
  const [rooms, setRooms] = useState([
    {
      roomName: 'Room1',
      roomHash: '#1234',
      encryptionKey: 7,
      users: ['user1'], // Example users
      messages: [],
      canJoin: true, // Less than 2 users, so canJoin is true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const selectedRoom = rooms.find((room) => room.roomName === chosenRoom);

  if (!selectedRoom) {
    return <p>No room selected or room does not exist.</p>;
  }

  // Update canJoin whenever users in a room change
  const updateRooms = (roomsData) => {
    const updatedRooms = roomsData.map((room) => ({
      ...room,
      canJoin: room.users.length < 2, // Set canJoin based on the number of users
    }));
    setRooms(updatedRooms);
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageInstance = new Message(newMessage);
      const encryptedMsg = messageInstance.encrypt(selectedRoom.encryptionKey);

      // Add the encrypted message to the room's messages
      const updatedRooms = rooms.map((r) =>
        r.roomHash === selectedRoom.roomHash
          ? {
              ...r,
              messages: [...r.messages, { sender: 'user1', message: encryptedMsg }],
            }
          : r
      );
      updateRooms(updatedRooms);

      // Clear input field
      setNewMessage('');
    }
  };

  // Handle leaving the room
  const handleLeaveRoom = () => {
    const roomName = window.prompt('Enter the room name to leave:');
    const encryptionKey = parseInt(window.prompt('Enter the encryption key:'));

    const updatedRooms = rooms.map((room) => {
      if (room.roomName === roomName && room.encryptionKey === encryptionKey) {
        // Remove user from the room's user list
        return { ...room, users: room.users.filter((user) => user !== 'user1') };
      }
      return room;
    });

    updateRooms(updatedRooms);
  };

  return (
    <div className="p-4 relative">
      {/* Leave room button */}
      <button
        onClick={handleLeaveRoom}
        className="absolute m-2 top-0 right-0 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Delete Room
      </button>

      <h2 className="text-lg font-bold">
        {selectedRoom.roomName} ({selectedRoom.roomHash})
      </h2>

      {/* Display the room's encryption key */}
      <p className="text-gray-500">Encryption Key: {selectedRoom.encryptionKey}</p>

      {/* Show if the user can join this room */}
      <div className="my-2">
        {selectedRoom.canJoin ? <p>You can join this room</p> : <p>This room is full</p>}
      </div>

      {/* Render encrypted messages */}
      <div className="my-4 p-4 border rounded-md bg-gray-100">
        {selectedRoom.messages.map((msgObj, index) => {
          const messageInstance = new Message('');
          messageInstance.encryptedText = msgObj.message;

          return (
            <div key={index} className="mb-2">
              <strong>{msgObj.sender}: </strong>
              <span>{messageInstance.decrypt(selectedRoom.encryptionKey)}</span>
            </div>
          );
        })}
      </div>

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          className="p-2 flex-1 border rounded-md"
          placeholder="Input text"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Send</button>
      </form>
    </div>
  );
};

export default Chat;
