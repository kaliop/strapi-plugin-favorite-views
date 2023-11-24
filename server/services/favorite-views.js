'use strict';

module.exports = ({ strapi }) => ({
  async find(user) {
    try {
      let privateViews = [];
      if (user) {
        privateViews = await strapi.entityService.findMany('plugin::favorite-views.saved-view', {
          filters: {
            $and: [{ createdBy: { id: user.id } }, { visibility: 'private' }]
          },
          populate: ['createdBy']
        });
      }

      let userViews = [];
      if (user) {
        userViews = await strapi.entityService.findMany('plugin::favorite-views.saved-view', {
          filters: {
            $and: [{ createdBy: { id: user.id } }, { visibility: { $in: ['public', 'roles'] } }]
          },
          populate: ['createdBy']
        });
      }

      let sharedViews = [];
      if (user.roles.length) {
        const userRoles = user.roles.map((role) => role.code);
        const allViews = await strapi.entityService.findMany('plugin::favorite-views.saved-view', {
          populate: ['createdBy']
        });
        const allSharedViews = allViews.filter((view) => view.createdBy.id !== user.id);
        sharedViews = allSharedViews.filter((view) => {
          if (view.roles.length && view.visibility === 'roles') {
            return view.roles?.some((role) => userRoles.includes(role));
          }
          return view.visibility === 'public';
        });
      }

      return { privateViews, userViews, sharedViews };
    } catch (error) {
      throw new Error(`Find favorite views error : ${error}`);
    }
  },
  async create(name, slug, roles, visibility, userId) {
    if (userId) {
      try {
        return await strapi.entityService.create('plugin::favorite-views.saved-view', {
          data: {
            name,
            slug,
            roles,
            visibility,
            createdBy: userId
          }
        });
      } catch (error) {
        throw new Error(`Create view error : ${error}`);
      }
    } else {
      throw new Error('UserId is not defined');
    }
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
  async update(id, name, slug, roles, visibility, userId) {
    if (id) {
      try {
        return await strapi.entityService.update('plugin::favorites-views.favoriteview', id, {
          data: {
            name,
            slug,
            roles,
            visibility,
            updatedBy: userId
          }
        });
      } catch (error) {
        throw new Error(`View update failed : ${error}`);
      }
    } else {
      throw new Error('Id is not defined');
    }
  },
  async getRoles() {
    return await strapi.db.query('admin::role').findMany();
  }
});
