'use strict';
const axios = require('axios');
let lastTime = 0;

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
            const msgContent = msgList
              .filter(msg => {
                return msg.msgTime > lastTime;
              })
              .map(msg => {
                lastTime = msg.msgTime > lastTime ? msg.msgTime : lastTime;
                const extInfo = JSON.parse(msg.extInfo);
                const msgType = extInfo.messageObject;
                if (msgType === 'text') {
                  return msg.bodys;
                } else if (msgType === 'image') {
                  return JSON.parse(msg.bodys).url;
                } else if (msgType === 'live') {
                  return `https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=${extInfo.referenceObjectId}`;
                } else if (msgType === 'diantai') {
                  return `https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=${extInfo.referenceObjectId}`;
                }
                return `信息类型未知:${msgType}`;
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
