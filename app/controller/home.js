'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      await this.ctx.render('index.html', {
        welcomeText: '欢迎进入口袋房间',
      });
    }
  }
  return HomeController;
};
