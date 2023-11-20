'use strict';

module.exports = ({ strapi }) => ({
  async find() {
    return await strapi.entityService.findMany('plugin::favorite-views.saved-view');
  },
  async create(name, slug) {
    return await strapi.entityService.create('plugin::favorite-views.saved-view', {
      data: {
        name,
        slug
      }
    });
  },
  async delete(id) {
    return await strapi.entityService.delete('plugin::favorite-views.saved-view', id);
  }
});
