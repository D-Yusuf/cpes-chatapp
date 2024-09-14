import { v4 as uuidv4 } from 'uuid';

function generateEncryptionKey() {
    return Math.floor(Math.random() * 25) + 1; // Returns a number between 1 and 25
  }



const users = [
  {
    username: 'user1',
    id: uuidv4(),
    rooms: ['Room1#1234', 'Room2#5678']
  },
  {
    username: 'user2',
    id: uuidv4(),
    rooms: ['Room1#1234']
  },
  {
    username: 'user3',
    id: uuidv4(),
    rooms: ['Room2#5678', 'Room3#9101']
  }
];
const rooms = [
    {
      name: 'Room1',
      hash: '#1234',
      encryptionKey: 7,
      users: ['user1', 'user2'],
      messages: [],
      canJoin: true
    },
    {
      name: 'Room2',
      hash: '#5678',
      encryptionKey: 13,
      users: ['user1'],
      messages: [],
      canJoin: true
    }
  ];
  
  // Dynamically set specialName for each room
  rooms.forEach(room => {
    room.specialName = room.name + room.hash;
  });



export  {rooms, users};
