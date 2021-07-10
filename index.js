// Node server which will handle socket io connections
const io = require('socket.io')(process.env.PORT || 8000)

const users = {};

io.on('connection', socket =>{
    //other users connected to the server get to know someone joined
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // broadcasting message to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // other users connected to the server get to know someone left
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})