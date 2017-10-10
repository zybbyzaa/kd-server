'use strict';

exports.schedule = {
  type: 'worker',
  cron: '0 56 17 * * *',
};

exports.task = function* (ctx) {
  yield ctx.service.kdRoom.getKdRoomMsg();
};
