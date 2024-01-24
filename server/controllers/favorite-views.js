'use strict';

module.exports = ({ strapi }) => ({
  async findUserViews(ctx) {
    const user = ctx.state.user;
    const { page = 1, pageSize = 10 } = ctx.query;

    ctx.body = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .findUserViews({ page, pageSize }, user);
  },
  async findSharedViews(ctx) {
    const user = ctx.state.user;
    const { page = 1, pageSize = 10 } = ctx.query;

    ctx.body = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .findSharedViews({ page, pageSize }, user);
  },
  async findPrivateViews(ctx) {
    const user = ctx.state.user;

    ctx.body = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .findPrivateViews(user);
  },
  async create(ctx) {
    const userId = ctx.state.user.id;
    const { name, slug, roles, visibility } = ctx.request.body;

    ctx.body = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .create(name, slug, roles, visibility, userId);
  },
  async delete(ctx) {
    const { id } = ctx.params;

    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').delete(id);
  },
  async update(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;
    const { name, roles, visibility } = ctx.request.body;

    ctx.body = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .update(id, name, roles, visibility, userId);
  },
  async getRoles(ctx) {
    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').getRoles();
  }
});
