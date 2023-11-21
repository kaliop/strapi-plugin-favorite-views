import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';

import CONST from '../../CONST';

const useViewsWidget = () => {
  const { get } = useFetchClient();

  const [userRoles, setUserRoles] = useState([]);
  const [viewsMenuVisible, setViewsMenuVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    getUserRoles();
  }, []);

  const getUserRoles = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_ROLES);

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
