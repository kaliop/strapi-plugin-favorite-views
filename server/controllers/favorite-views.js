'use strict';

module.exports = ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;

    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').find(user);
  },
  async create(ctx) {
    const { name, slug } = ctx.request.body;

    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').create(name, slug);
  },
  async delete(ctx) {
    const { id } = ctx.params;

    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').delete(id);
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { name, url, roles } = ctx.request.body;

    ctx.body = await strapi
      .plugin('favorites-views')
      .service('favoriteViews')
      .update(id, name, url, roles);
  }
});
