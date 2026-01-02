const path = require('path')
const http = require('http')
const express = require('express')
const { Server } = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))

// Run the client connects
io.on('connection', socket => {
    console.log('New ws connection...')

    socket.emit('message', 'Welcome to chat cord')
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`server running on port ${PORT}`))