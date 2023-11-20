module.exports = [
  {
    method: 'GET',
    path: '/find',
    handler: 'favoriteViews.find',
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: 'DELETE',
    path: '/delete/:id',
    handler: 'favoriteViews.delete',
    config: {
      policies: [],
      auth: false
    }
  }
];
