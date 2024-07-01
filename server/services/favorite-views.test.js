const createFavoriteViews = require('./favorite-views');

describe('services/favorite-views', () => {
  let fav;
  let strapi;
  let user;

  beforeEach(() => {
    strapi = {
      admin: {
        config: {
          url: 'strapi.admin.config.url'
        }
      },
      entityService: {
        count: jest.fn(async () => 42),
        create: jest.fn(async () => {}),
        delete: jest.fn(async () => {}),
        findMany: jest.fn(async () => [{ foo: 'bar' }]),
        findPage: jest.fn(async () => [{ foo: 'bar' }]),
        update: jest.fn(async () => {})
      }
    };
    user = {
      id: 'userId',
      roles: ['role1', 'role2']
    };

    fav = createFavoriteViews({ strapi });
  });

  test('create', async () => {
    const name = 'name';
    const slug = 'slug';
    const roles = ['role1', 'role2'];
    const visibility = 'visibility';
    const userId = 'userId';

    await fav.create(name, slug, roles, visibility, userId);
    const [uid, data] = strapi.entityService.create.mock.calls[0];

    expect(uid).toBe('plugin::favorite-views.saved-view');
    expect(data).toStrictEqual({
      data: {
        name: 'name',
        slug: 'slug',
        roles: ['role1', 'role2'],
        visibility: 'visibility',
        createdBy: 'userId'
      }
    });
  });

  test('delete', async () => {
    await fav.delete('id');

    const [, id] = strapi.entityService.delete.mock.calls[0];
    expect(id).toBe('id');
  });

  test('getPrivateViews', async () => {
    const response = await fav.getPrivateViews(user);
    expect(response).toStrictEqual([{ foo: 'bar' }]);
  });

  test('getSharedViews', async () => {
    const response = await fav.getSharedViews({}, user);

    expect(response).toStrictEqual([{ foo: 'bar' }]);
  });

  test('getUserViews', async () => {
    const response = await fav.getUserViews(
      {
        start: 6,
        limit: 12
      },
      user
    );

    expect(strapi.entityService.findPage.mock.calls[0]).toStrictEqual([
      'plugin::favorite-views.saved-view',
      {
        filters: {
          createdBy: { id: user.id }
        },
        page: 1,
        pageSize: 10,
        populate: ['createdBy']
      }
    ]);

    expect(response).toStrictEqual([{ foo: 'bar' }]);
  });

  test('update', async () => {
    const foobar = { foo: 'bar' };
    strapi.entityService.update = jest.fn(async () => foobar);

    expect(await fav.update('id', 'name', ['role1', 'role2'], 'visibility', 'userId')).toBe(foobar);

    const [uid, id, data] = strapi.entityService.update.mock.calls[0];

    expect(uid).toBe('plugin::favorite-views.saved-view');
    expect(id).toBe('id');

    expect(data).toStrictEqual({
      data: {
        name: 'name',
        roles: ['role1', 'role2'],
        visibility: 'visibility',
        updatedBy: 'userId'
      }
    });
  });
});
