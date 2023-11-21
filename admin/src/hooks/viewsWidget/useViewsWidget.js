import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';

const useViewsWidget = () => {
  const { get } = useFetchClient();

  const [userRoles, setUserRoles] = useState([]);
  const [viewsMenuVisible, setViewsMenuVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    getUserRoles();
  }, []);

  const getUserRoles = async () => {
    const requestURL = '/favorite-views/getRoles';

    const { data } = await get(requestURL);

    setUserRoles(data);
  };

  return {
    viewsMenuVisible,
    setViewsMenuVisible,
    showCreateModal,
    setShowCreateModal,
    userRoles,
    setUserRoles
  };
};

export default useViewsWidget;
