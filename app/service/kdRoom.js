'use strict';
const path = require('path');
const fs = require('fs');
const axios = require('axios');
let lastTime = 0;

module.exports = app => {
  class KdRoom extends app.Service {
    * getKdRoomMsg() {
      const msg = yield axios({
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
                  return {
                    msgTime: msg.msgTime,
                    msgText: msg.bodys,
                  };
                } else if (msgType === 'image') {
                  return {
                    msgTime: msg.msgTime,
                    msgText: JSON.parse(msg.bodys).url,
                  };
                } else if (msgType === 'videoRecord') {
                  return {
                    msgTime: msg.msgTime,
                    msgText: JSON.parse(msg.bodys).url,
                  };
                } else if (msgType === 'live') {
                  return {
                    msgTime: msg.msgTime,
                    msgText: `https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=${extInfo.referenceObjectId}`,
                  };
                } else if (msgType === 'diantai') {
                  return {
                    msgTime: msg.msgTime,
                    msgText: `https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=${extInfo.referenceObjectId}`,
                  };
                }
                this.ctx.logger.debug(msg);
                return {
                  msgTime: msg.msgTime,
                  msgText: `信息类型未知:${msgType}`,
                };
              });
            return msgContent;
          }
        })
        .catch(err => {
          this.ctx.logger.error(err);
        });
      const dataMsg = [];
      let localMsgData = [];
      const jsonPath = path.resolve(
        __dirname,
        '..',
        'public/localMsgData.json'
      );
      this.ctx.logger.debug('文件路径', jsonPath);
      if (fs.existsSync(jsonPath)) {
        const content = fs.readFileSync(jsonPath, 'utf-8');
        localMsgData = JSON.parse(content);
        const localFirstMsgTime =
          (localMsgData[0] && localMsgData[0].msgTime) || 0;
        const newMsg = msg.filter(msg => {
          return msg.msgTime > localFirstMsgTime;
        });
        dataMsg.push(...newMsg);
        dataMsg.push(...localMsgData);
      } else {
        dataMsg.push(...msg);
      }
      if (dataMsg.length !== localMsgData.length) {
        const jsonStr = JSON.stringify(dataMsg);
        this.ctx.logger.debug('写入新数据');
        fs.writeFileSync(jsonPath, jsonStr);
      }
    }
    * getLocalMsg(lastTime) {
      const jsonPath = path.resolve(
        __dirname,
        '..',
        'public/localMsgData.json'
      );
      const content = fs.readFileSync(jsonPath, 'utf-8');
      const localMsgData = JSON.parse(content).filter(msg => {
        return msg.msgTime > lastTime;
      });
      this.ctx.logger.debug(localMsgData);
    }
  }
  return KdRoom;
};
