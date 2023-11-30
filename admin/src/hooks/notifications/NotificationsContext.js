import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useNotifications from './useNotifications';

const NotificationsContext = createContext(null);

const NotificationsProvider = ({ children }) => {
  const { notification, setNotification } = useNotifications();

  return (
    <NotificationsContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { NotificationsContext, NotificationsProvider };
