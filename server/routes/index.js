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
  }
];
