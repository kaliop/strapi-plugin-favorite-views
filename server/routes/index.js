module.exports = [
  {
    method: 'GET',
    path: '/findUserViews',
    handler: 'favoriteViews.findUserViews',
    config: {
      policies: []
    }
  },
  {
    method: 'GET',
    path: '/findSharedViews',
    handler: 'favoriteViews.findSharedViews',
    config: {
      policies: []
    }
  },
  {
    method: 'GET',
    path: '/findPrivateViews',
    handler: 'favoriteViews.findPrivateViews',
    config: {
      policies: []
    }
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'favoriteViews.create',
    config: {
      policies: []
    }
  },
  {
    method: 'DELETE',
    path: '/delete/:id',
    handler: 'favoriteViews.delete',
    config: {
      policies: []
    }
  },
  {
    method: 'PUT',
    path: '/update/:id',
    handler: 'favoriteViews.update',
    config: {
      policies: []
    }
  },
  {
    method: 'GET',
    path: '/getRoles',
    handler: 'favoriteViews.getRoles',
    config: {
      policies: []
    }
  }
];
