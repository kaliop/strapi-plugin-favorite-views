'use strict';

module.exports = ({ strapi }) => ({
  async find(ctx) {
    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').find();
  },
  async delete(ctx) {
    const { id } = ctx.params;

    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').delete(id);
  }
});
