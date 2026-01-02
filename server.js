const path = require('path')
const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const formatMessage = require('./utils/messages');
const { getCurrentUser, userJoin, userLeave, getRoomUser } = require('./utils/users');


const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))
const chatBot = 'ChatCord Bot'

// Run the client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome Current User
        socket.emit('message', formatMessage(chatBot, 'Welcome to chatcord app'))

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(chatBot, `${user.username} joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUser(user.room)
        });

    });

    // Runs when client disconnected
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(chatBot, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUser(user.room)
            });
        }
    });
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`server running on port ${PORT}`))