const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(expressServer);
const path = require('path');

app.use(express.static('../client-socket/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client-socket', 'build', 'index.html'));
})


app.get('/express-server', (req, res) => {
    res.end('This is socket server');
})
io.on('connection', (socket) => {
    console.log('New user connected!');

    setTimeout(() => {
        io.emit('message', "Hi, this is welcome message...");
    }, 5000);
    
    socket.on('disconnect', () =>{
        console.log('User Disconnected!')
    })
})


expressServer.listen(5000, () => console.log(`Server running @ 5000`));
