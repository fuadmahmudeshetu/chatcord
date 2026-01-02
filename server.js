const path = require('path')
const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const formatMessage = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))
const chatBot = 'ChatCord Bot'

// Run the client connects
io.on('connection', socket => {

    // Welcome Current User
    socket.emit('message', formatMessage(chatBot, 'Welcome to chatcord app'))

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnected

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    });
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`server running on port ${PORT}`))