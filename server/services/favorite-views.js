'use strict';

module.exports = ({ strapi }) => ({
  async find() {
    return await strapi.entityService.findMany('plugin::favorite-views.saved-view');
  },
  async delete(id) {
    return await strapi.entityService.delete('plugin::favorite-views.saved-view', id);
  }
});
