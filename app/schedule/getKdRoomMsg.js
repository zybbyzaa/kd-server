'use strict';

exports.schedule = {
  type: 'worker',
  immediate: true,
  cron: '*/1 10-23 * * *',
};

exports.task = function* (ctx) {
  console.log(new Date());
  yield ctx.service.kdRoom.getKdRoomMsg();
};
