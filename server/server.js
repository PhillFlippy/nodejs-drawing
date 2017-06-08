const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); //set the path to the public folder. dirname makes sure it will always point to the folder
const port = process.env.PORT || 8080;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  //socket listenter and emitter 

    socket.on('draw', (line) => {
      //draw the line on all users except the sender.
      io.emit('drawLine', line);
    });

});

app.use(express.static(publicPath));


server.listen(port, () => { //use server.listen instead of app.listen when dealing with sockets
  console.log('Server up on port: ', port);
});
