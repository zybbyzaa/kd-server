'use strict';
const axios = require('axios');

module.exports = app => {
  class KdRoom extends app.Service {
    * getKdRoomMsg() {
      yield axios({
        method: 'post',
        url:
          'https://pjuju.48.cn/imsystem/api/im/v1/member/room/message/mainpage',
        data: {
          roomId: 5773822,
          chatType: 0,
          lastTime: 0,
          limit: 10,
        },
        headers: {
          token:
            'tHZW68d3JYxdtaDDd8Qab+2T2HFPllBMoqDdPoimTCHCwzMhZ2n+7fgGsUtevP/gOY4eAF9ifbM=',
        },
      })
        .then(res => {
          if (res.status === 200) {
            const msgList = res.data.content.data;
            let lastTime = this.ctx.session.lastTime;
            if (!lastTime && msgList[0]) {
              // lastTime = msgList[0].msgTime;
              // this.ctx.session.lastTime = lastTime;
              lastTime = 0;
            }
            const msgContent = msgList
              .filter(msg => {
                return msg.msgTime > lastTime;
              })
              .map(msg => {
                if (typeof msg.bodys === 'object') {
                  return msg.bodys.url;
                } else if (typeof msg.bodys === 'string' && msg.bodys) {
                  return msg.bodys;
                }
                return `${msg.extInfo.msgText}->${msg.extInfo.faipaiContent}`;
              });
            console.log(msgContent);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  return KdRoom;
};
