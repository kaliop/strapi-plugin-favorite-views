'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = ({ strapi }) => ({
  async getUserViews(ctx) {
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;
    const sanitizedQueryParams = await sanitize.contentAPI.query(ctx.query, contentType, {
      auth: ctx.state.auth
    });
    const { page = 1, pageSize = 10 } = sanitizedQueryParams;

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
    const sanitizedQueryParams = await sanitize.contentAPI.query(ctx.query, contentType, {
      auth: ctx.state.auth
    });
    const { page = 1, pageSize = 10 } = sanitizedQueryParams;

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
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;

    const results = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .getPrivateViews(user);

    const privateViewsData = await sanitize.contentAPI.output(results, contentType, {
      auth: user
    });

    return privateViewsData;
  },

  async create(ctx) {
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;
    const userId = ctx.state.user.id;
    const sanitizedRequestBody = await sanitize.contentAPI.input(ctx.request.body, contentType, {
      auth: ctx.state.auth
    });
    const { name, slug, roles, visibility } = sanitizedRequestBody;

    const result = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .create(name, slug, roles, visibility, userId);

    return await sanitize.contentAPI.output(result, contentType, {
      auth: user
    });
  },

  async delete(ctx) {
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;
    const sanitizedQueryParams = await sanitize.contentAPI.query(ctx.params, contentType, {
      auth: ctx.state.auth
    });
    const { id } = sanitizedQueryParams;
    const result = await strapi.plugin('favorite-views').service('favoriteViews').delete(id);

    return await sanitize.contentAPI.output(result, contentType, {
      auth: user
    });
  },

  async update(ctx) {
    const contentType = strapi.contentType('plugin::favorite-views.saved-view');
    const user = ctx.state.user;
    const userId = user.id;
    const sanitizedQueryParams = await sanitize.contentAPI.query(ctx.params, contentType, {
      auth: ctx.state.auth
    });
    const { id } = sanitizedQueryParams;
    const sanitizedRequestBody = await sanitize.contentAPI.input(ctx.request.body, contentType, {
      auth: ctx.state.auth
    });
    const { name, roles, visibility } = sanitizedRequestBody;

    const result = await strapi
      .plugin('favorite-views')
      .service('favoriteViews')
      .update(id, name, roles, visibility, userId);

    return await sanitize.contentAPI.output(result, contentType, {
      auth: user
    });
  },

  async getRoles(ctx) {
    ctx.body = await strapi.plugin('favorite-views').service('favoriteViews').getRoles();
  }
});
