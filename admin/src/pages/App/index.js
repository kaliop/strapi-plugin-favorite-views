/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import { ViewsProvider } from '../../hooks/views/ViewsContext';

const App = () => {
  return (
    <div>
      <ViewsProvider>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={AnErrorOccurred} />
        </Switch>
      </ViewsProvider>
    </div>
  );
};

export default App;
