module.exports = [
  {
    method: 'GET',
    path: '/find',
    handler: 'favoriteViews.find',
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
      policies: [],
      auth: false
    }
  }
];
