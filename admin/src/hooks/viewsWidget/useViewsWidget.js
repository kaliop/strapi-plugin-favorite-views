import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import CONST from '../../CONST';

const useViewsWidget = () => {
  const { get } = useFetchClient();
  const { formatMessage } = useIntl();

  const [viewsPopoverVisible, setViewsPopoverVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [viewName, setViewName] = useState('');
  const [viewRoles, setViewRoles] = useState([]);
  const [viewVisibility, setViewVisibility] = useState(CONST.VIEWS_VISIBILITY.PRIVATE);
  const [nameInputError, setNameInputError] = useState('');
  const [rolesInputError, setRolesInputError] = useState('');

  useEffect(() => {
    getUserRoles();
  }, []);

  useEffect(() => {
    setFormErrors();
  }, [viewName, viewRoles]);

  const getUserRoles = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_ROLES);

    setUserRoles(data);
  };

  const setFormErrors = () => {
    if (viewName.length > 32) {
      setNameInputError(
        formatMessage({
          id: getTrad('CreateViewForm.NameInput.hint')
        })
      );
    } else {
      setNameInputError('');
    }

    if (viewRoles.length) {
      setRolesInputError('');
    }
  };

  return {
    viewsPopoverVisible,
    setViewsPopoverVisible,
    showCreateModal,
    setShowCreateModal,
    userRoles,
    setUserRoles,
    viewName,
    setViewName,
    viewRoles,
    setViewRoles,
    viewVisibility,
    setViewVisibility,
    nameInputError,
    setNameInputError,
    rolesInputError,
    setRolesInputError
  };
};

export default useViewsWidget;
