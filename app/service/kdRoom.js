'use strict';
const path = require('path');
const fs = require('fs');
const axios = require('axios');
let lastTime = 0;

module.exports = app => {
  class KdRoom extends app.Service {
    async getKdRoomMsg() {
      const { roomId, token } = app.config.kd;
      const msg = await axios({
        method: 'post',
        url:
          'https://pjuju.48.cn/imsystem/api/im/v1/member/room/message/mainpage',
        data: {
          roomId,
          chatType: 0,
          lastTime: 0,
          limit: 10,
        },
        headers: {
          token,
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
                let msgInfo = {
                  msgTime: msg.msgTime,
                  msgType,
                  msgText: `信息类型未知:${msgType}`,
                };
                if (msgType === 'text') {
                  msgInfo = {
                    msgTime: msg.msgTime,
                    msgType,
                    msgText: msg.bodys,
                  };
                } else if (msgType === 'image') {
                  msgInfo = {
                    msgTime: msg.msgTime,
                    msgType,
                    msgText: JSON.parse(msg.bodys).url,
                  };
                } else if (msgType === 'videoRecord') {
                  msgInfo = {
                    msgTime: msg.msgTime,
                    msgType,
                    msgText: JSON.parse(msg.bodys).url,
                  };
                } else if (msgType === 'live') {
                  msgInfo = {
                    msgTime: msg.msgTime,
                    msgType,
                    msgText: `https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=${extInfo.referenceObjectId}`,
                  };
                } else if (msgType === 'diantai') {
                  msgInfo = {
                    msgTime: msg.msgTime,
                    msgType,
                    msgText: `https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=${extInfo.referenceObjectId}`,
                  };
                } else if (msgType === 'faipaiText') {
                  msgInfo = {
                    msgTime: msg.msgTime,
                    msgType,
                    msgText: `${extInfo.faipaiContent}=>${extInfo.messageText}`,
                  };
                } else {
                  this.ctx.logger.debug(msg);
                }
                return msgInfo;
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
        if (newMsg.length > 0) {
          dataMsg.push(...newMsg);
          app.io.of('/kd').emit('res', newMsg);
        }
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
    async getLocalMsg(lastTime) {
      const jsonPath = path.resolve(
        __dirname,
        '..',
        'public/localMsgData.json'
      );
      const content = fs.readFileSync(jsonPath, 'utf-8');
      const localMsgData = JSON.parse(content).filter(msg => {
        return msg.msgTime > lastTime;
      });
      return lastTime > 0 ? localMsgData : localMsgData.slice(0, 5);
    }
  }
  return KdRoom;
};
