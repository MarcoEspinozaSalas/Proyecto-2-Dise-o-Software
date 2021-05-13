const app = require('./app');
const http = require('http');
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

const server = http.createServer(app);

let io = require('socket.io')(server, {
  cors: {
    credentials: false
  }
});

io.on('connection', (socket) => {
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});
  });

  socket.on('set-name', (name) => {
    socket.username = name;
    io.emit('users-changed', {user: name, event: 'joined'});
  });

  socket.on('send-message', (message) => {
    io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});
  });

  socket.on('chat-typing', (userTyping) => {
    io.emit('typing', {user: userTyping.user, state: userTyping.state});
  })

  socket.on('click-refresh', (test) => {
    io.emit('refresh', {test});
  })
});


server.listen(port, () => {
  console.log(`[El servidor está corriendo en la dirección '${hostname}:${port}']`);
});

module.exports = server;
