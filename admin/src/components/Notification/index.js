import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Alert, Box } from '@strapi/design-system';

import useTranslate from '../../hooks/translations/useTranslate';
import { NotificationsContext } from '../../hooks/notifications/NotificationsContext';

const Notification = ({ notification }) => {
  const { translate } = useTranslate();
  const { setNotification } = useContext(NotificationsContext);

  let notificationTimeout;

  useEffect(() => {
    if (notification) {
      notificationTimeout = setTimeout(() => {
        setNotification(null);
      }, 2500);
    }
  }, []);

  const closeNotification = () => {
    clearTimeout(notificationTimeout);
    setNotification(null);
  };

  return (
    <Box
      position="fixed"
      top="2.875rem"
      left="50%"
      width="500px"
      transform="translateX(-50%)"
      zIndex="100"
    >
      <Alert
        variant={notification.type}
        closeLabel={translate('Notifications.closeLabel')}
        onClose={closeNotification}
      >
        {notification.message}
      </Alert>
    </Box>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired
};

export default Notification;
