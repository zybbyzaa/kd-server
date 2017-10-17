'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      await this.ctx.render('index.html', {
        welcomeText: '欢迎使用口袋房间提醒',
      });
    }
  }
  return HomeController;
};
