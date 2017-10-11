'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.io.of('/kd').route('kd', app.io.controllers.kd);
};
