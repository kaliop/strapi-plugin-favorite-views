module.exports = [
  {
    method: 'GET',
    path: '/getUserViews',
    handler: 'favoriteViews.getUserViews',
    config: {
      policies: []
    }
  },
  {
    method: 'GET',
    path: '/getSharedViews',
    handler: 'favoriteViews.getSharedViews',
    config: {
      policies: []
    }
  },
  {
    method: 'GET',
    path: '/getPrivateViews',
    handler: 'favoriteViews.getPrivateViews',
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
