'use strict';

module.exports = () => {
  return function* () {
    const lastTime = this.args[0];
    console.log('chat :', lastTime + ' : ' + process.pid);
    const msg = yield this.service.kdRoom.getLocalMsg(lastTime);
    this.socket.emit('res', msg);
  };
};
