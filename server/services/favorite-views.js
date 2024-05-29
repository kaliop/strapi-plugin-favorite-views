'use strict';

module.exports = ({ strapi }) => ({
  async getUserViews(params, user) {
    const { page = 1, pageSize = 10 } = params;

    try {
      if (user) {
        return await strapi.entityService.findPage('plugin::favorite-views.saved-view', {
          page,
          pageSize,
          filters: { createdBy: { id: user.id } },
          populate: ['createdBy']
        });
      }
    } catch (error) {
      throw new Error(`Find favorite user views error : ${error}`);
    }
  },

  async getSharedViews(params, user) {
    const { page = 1, pageSize = 10 } = params;

    try {
      if (user.roles.length) {
        const userRoles = user.roles.map((role) => role.code);
        return await strapi.entityService.findPage('plugin::favorite-views.saved-view', {
          page,
          pageSize,
          filters: {
            $and: [
              { createdBy: { id: { $ne: user.id } } },
              {
                $or: [
                  {
                    $and: [
                      { visibility: 'roles' },
                      { $or: userRoles.map((role) => ({ roles: { $contains: role } })) }
                    ]
                  },
                  { visibility: 'public' }
                ]
              }
            ]
          },
          populate: ['createdBy']
        });
      }
    } catch (error) {
      throw new Error(`Find favorite shared views error : ${error}`);
    }
  },

  async getPrivateViews(user) {
    try {
      if (user) {
        return await strapi.entityService.findMany('plugin::favorite-views.saved-view', {
          filters: {
            $and: [{ createdBy: { id: user.id } }, { visibility: 'private' }]
          },
          populate: ['createdBy']
        });
      }
    } catch (error) {
      throw new Error(`Find favorite private views error : ${error}`);
    }
  },

  async create(name, slug, roles, visibility, userId) {
    if (userId) {
      const ADMIN_URL = strapi.admin.config.url || '/admin';
      const formattedSlug = slug.replace(ADMIN_URL, '');

      try {
        return await strapi.entityService.create('plugin::favorite-views.saved-view', {
          data: {
            name,
            slug: formattedSlug,
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

  async update(id, name, roles, visibility, userId) {
    if (id) {
      try {
        return await strapi.entityService.update('plugin::favorite-views.saved-view', id, {
          data: {
            name,
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
