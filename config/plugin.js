'use strict';

// had enabled by egg
exports.static = true;
exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.session = true;
