'use strict';

module.exports = () => {
  return async function() {
    const lastTime = this.args[0];
    // this.ctx.logger.info(`LastTime:${lastTime}`);
    const msg = await this.service.kdRoom.getLocalMsg(lastTime);
    this.socket.emit('lastestMsg', msg);
  };
};
