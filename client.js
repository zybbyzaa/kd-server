'use strict';

// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')('http://127.0.0.1:7001/kd');
const lastTime = 0;

socket.on('connect', () => {
  console.log('connect!');
  socket.emit('kd', lastTime);
});

socket.on('res', msgs => {
  console.log(msgs);
  msgs.forEach(msg => {
    console.log('res from server: %s!', msg.msgText);
  });
});
socket.on('test', msgs => {
  console.log('res from server: %s!', msgs);
});
