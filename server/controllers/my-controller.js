'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('favorite-views')
      .service('myService')
      .getWelcomeMessage();
  },
});
