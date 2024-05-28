'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = ({ strapi }) => ({
  async getUserViews(ctx) {
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;
    const { page = 1, pageSize = 10 } = ctx.query;
    const { results, pagination } = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .getUserViews({ page, pageSize }, user);

    const userViewsData = await sanitize.contentAPI.output(results, contentType, {
      auth: user
    });

    return { userViewsData, pagination };
  },

  async getSharedViews(ctx) {
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;
    const { page = 1, pageSize = 10 } = ctx.query;

    const { results, pagination } = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .getSharedViews({ page, pageSize }, user);

    const sharedViewsData = await sanitize.contentAPI.output(results, contentType, {
      auth: user
    });

    return { sharedViewsData, pagination };
  },

  async getPrivateViews(ctx) {
    const user = ctx.state.user;

    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').getPrivateViews(user);
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
