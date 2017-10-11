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

  return config;
};
