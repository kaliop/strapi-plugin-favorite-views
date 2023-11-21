'use strict';

module.exports = ({ strapi }) => ({
  async find(user) {
    try {
      let userViews = [];
      if (user) {
        userViews = await strapi.entityService.findMany('plugin::favorite-views.saved-view', {
          filters: { createdBy: { id: user.id } },
          populate: ['createdBy']
        });
      }

      let sharedViews = [];
      if (user.roles.length) {
        const userRoles = user.roles.map((role) => role.code);
        const allViews = await strapi.entityService.findMany('plugin::favorite-views.saved-view', {
          populate: ['createdBy']
        });
        const allRolesViews = allViews.filter((view) =>
          view.roles?.some((role) => userRoles.includes(role))
        );
        sharedViews = allRolesViews.filter((view) => view.createdBy.id !== user.id);
      }

      return { userViews, sharedViews };
    } catch (error) {
      throw new Error(`Find favorite views error : ${error}`);
    }
  },
  async create(name, slug, userId) {
    return await strapi.entityService.create('plugin::favorite-views.saved-view', {
      data: {
        name,
        slug,
        createdBy: userId
      }
    });
  },
  async delete(id) {
    if (id) {
      try {
        return await strapi.entityService.delete('plugin::favorite-views.saved-view', id);
      } catch (error) {
        throw new Error(`View deletion failed : ${error}`);
      }
    } else {
      throw new Error('Id is not defined');
    }
  },
  async update(id, name, url, roles) {
    if (id) {
      try {
        return await strapi.entityService.update('plugin::favorites-views.favoriteview', id, {
          data: { name, url, roles }
        });
      } catch (error) {
        throw new Error(`View update failed : ${error}`);
      }
    } else {
      throw new Error('Id is not defined');
    }
  }
});
