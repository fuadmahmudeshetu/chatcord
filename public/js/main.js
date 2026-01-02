const getChatForm = document.getElementById('chat-form');

const socket = io();

getChatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    console.log(msg);
})