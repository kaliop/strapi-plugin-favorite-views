import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';

import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import ViewsWidget from './components/ViewsWidget';

import getTrad from './utils/getTrad';

import { ViewsProvider } from './hooks/views/ViewsContext';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('Admin.MainMenu.PluginName'),
        defaultMessage: name
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ]
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name
    });
  },

  bootstrap(app) {
    app.injectContentManagerComponent('listView', 'actions', {
      name: 'favorite-views-widget',
      Component: () => (
        <ViewsProvider>
          <ViewsWidget />
        </ViewsProvider>
      )
    });

    const env = typeof process === 'undefined' ? {} : process.env;

    if (env.STRAPI_ADMIN_FAVORITE_VIEWS_INJECT_TO) {
      for (const entry of process.env.STRAPI_ADMIN_FAVORITE_VIEWS_INJECT_TO.split(',')) {
        const [pluginName, container, block] = entry.split('.');
        const plugin = app.getPlugin(pluginName.replace(/^plugin::/, ''));

        if (!plugin) continue;

        plugin.injectComponent(container, block, {
          name: 'favorite-views-widget',
          Component: () => (
            <ViewsProvider>
              <ViewsWidget />
            </ViewsProvider>
          )
        });
      }
    }
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale
            };
          })
          .catch(() => {
            return {
              data: {},
              locale
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  }
};
