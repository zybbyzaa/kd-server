'use strict';

exports.schedule = {
  type: 'worker',
  immediate: true,
  cron: '*/1 10-23 * * *',
};

exports.task = async function(ctx) {
  console.log(new Date());
  await ctx.service.kdRoom.getKdRoomMsg();
};
