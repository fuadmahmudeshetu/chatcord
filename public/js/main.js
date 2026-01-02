const getChatForm = document.getElementById('chat-form');

const socket = io();

// get the message from the server
socket.on('message',  (message) => {
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
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeFormat = `${hours}:${minutes}`;

    div.classList.add('message');
    div.innerHTML = `
    <p class='meta'>Brad <span>${timeFormat}</span></p>
    <p class='text'>${message}</p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
    
}