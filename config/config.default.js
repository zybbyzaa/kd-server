'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1507623819229_9835';

  // add your config here
  config.middleware = [];

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  config.io = {
    namespace: {
      '/kd': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.kd = {
    memberId: 417317,
    roomId: 5773822,
    token:
      'tHZW68d3JYxdtaDDd8Qab+2T2HFPllBMoqDdPoimTCHCwzMhZ2n+7fgGsUtevP/gOY4eAF9ifbM=',
  };

  return config;
};
