const getChatForm = document.getElementById('chat-form');

const socket = io();

// get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room)

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