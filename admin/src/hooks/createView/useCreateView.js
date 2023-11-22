import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import CONST from '../../CONST';

const useCreateView = () => {
  const { get } = useFetchClient();
  const { formatMessage } = useIntl();

  const [userRoles, setUserRoles] = useState([]);
  const [name, setName] = useState('');
  const [roles, setRoles] = useState([]);
  const [visibility, setVisibility] = useState(CONST.VIEWS_VISIBILITY.PRIVATE);
  const [nameInputError, setNameInputError] = useState('');
  const [rolesInputError, setRolesInputError] = useState('');

  useEffect(() => {
    getUserRoles();
  }, []);

  useEffect(() => {
    setFormErrors();
  }, [name, roles]);

  const setFormErrors = () => {
    if (name.length > 32) {
      setNameInputError(
        formatMessage({
          id: getTrad('CreateViewForm.NameInput.hint')
        })
      );
    } else {
      setNameInputError('');
    }

    if (roles.length) {
      setRolesInputError('');
    }
  };

  const getUserRoles = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_ROLES);

    setUserRoles(data);
  };

  return {
    userRoles,
    setUserRoles,
    name,
    setName,
    roles,
    setRoles,
    visibility,
    setVisibility,
    nameInputError,
    setNameInputError,
    rolesInputError,
    setRolesInputError
  };
};

export default useCreateView;
