import { useState } from 'react';

const useNotifications = () => {
  const [notification, setNotification] = useState(null);

  return {
    notification,
    setNotification
  };
};

export default useNotifications;
