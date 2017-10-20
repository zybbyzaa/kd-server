'use strict';

const axios = require('axios');
axios({
  method: 'POST',
  url: 'https://plive.48.cn/livesystem/api/live/v1/memberLivePage',
  data: {
    lastTime: 0,
    limit: 20,
    groupId: 0,
    memberId: 417317,
    type: 1,
    giftUpdTime: 0,
  },
  headers: {
    version: '1.0.0',
    os: 'ios',
  },
}).then(res => {
  console.log(res.data.content.reviewList[2].streamPath);
  console.dir(res.data.content.reviewList[2]);
});
