'use strict';

const axios = require('axios');
const memberId = 417317;
const exec = require('child_process').exec;

axios({
  method: 'POST',
  url: 'https://plive.48.cn/livesystem/api/live/v1/memberLivePage',
  data: {
    lastTime: 0,
    limit: 20,
    groupId: 0,
    memberId,
    type: 1,
    giftUpdTime: 0,
  },
  headers: {
    version: '1.0.0',
    os: 'ios',
  },
}).then(res => {
  const liveList = res.data.content.liveList || [];
  const curLive = liveList.filter(live => {
    return live.memberId === memberId;
  })[0];
  const livePath = (curLive && curLive.streamPath) || '';
  if (livePath) {
    const liveOutName = `../live/${curLive.subTitle}(${curLive.startTime}).flv`;
    console.log(`开始录制直播，当前直播地址：${livePath}`);
    const ffmpeg = exec('ffmpeg.exe', [
      '-i',
      livePath,
      '-c:v',
      'copy',
      '-c:a',
      'copy',
      liveOutName,
    ]);
    process.stdin.pipe(ffmpeg.stdin);
    ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.pipe(process.stdout);
  }
});
