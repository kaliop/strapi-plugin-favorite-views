export default {
  REQUEST_URLS: {
    GET_USER_VIEWS: '/favorite-views/findUserViews',
    GET_SHARED_VIEWS: '/favorite-views/findSharedViews',
    GET_PRIVATE_VIEWS: '/favorite-views/findPrivateViews',
    CREATE_VIEW: '/favorite-views/create',
    DELETE_VIEW: '/favorite-views/delete/',
    UPDATE_VIEW: '/favorite-views/update/',
    GET_ROLES: '/favorite-views/getRoles'
  },

  VIEWS_VISIBILITY: {
    PRIVATE: 'private',
    PUBLIC: 'public',
    ROLES: 'roles'
  },

  NOTIFICATION_TYPES: {
    DANGER: 'danger',
    SUCCESS: 'success'
  }
};

export const ITEMS_PER_PAGE = [
  {
    label: '10',
    value: 10
  },
  {
    label: '20',
    value: 20
  },
  {
    label: '50',
    value: 50
  },
  {
    label: '100',
    value: 100
  }
];
