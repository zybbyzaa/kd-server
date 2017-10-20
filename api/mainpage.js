'use strict';

const axios = require('axios');
axios({
  method: 'POST',
  url: 'https://pjuju.48.cn/imsystem/api/im/v1/member/room/message/mainpage',
  data: {
    roomId: 5773822,
    chatType: 0,
    lastTime: 1508083200000,
    limit: 50,
  },
  headers: {
    token:
      'tHZW68d3JYxdtaDDd8Qab+2T2HFPllBMoqDdPoimTCHCwzMhZ2n+7fgGsUtevP/gOY4eAF9ifbM=',
  },
}).then(res => {
  console.log(res.data.content.data);
});
