const getChatForm = document.getElementById('chat-form');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

// get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', { username, room});

// get room and users
socket.on('roomUsers', ({username, users})=>{
    outputRoomName(room);
    outputUsers(users);
});

// get the message from the server
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
})

getChatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
});

// output message function 

function outputMessage(message) {
    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `
    <p class='meta'>${message.username}<span> ${message.time}</span></p>
    <p class='text'>${message.text}</p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user=> `<li>${user.username}</li>`).join('')}`;
}