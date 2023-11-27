import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import CONST from '../../CONST';

const useViews = () => {
  const { get, post, del, put } = useFetchClient();
  const { formatMessage } = useIntl();

  const [privateViews, setPrivateViews] = useState([]);
  const [userViews, setUserViews] = useState([]);
  const [sharedViews, setSharedViews] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewToDelete, setViewToDelete] = useState(null);

  const [viewsPopoverVisible, setViewsPopoverVisible] = useState(false);

  const [viewName, setViewName] = useState('');
  const [viewRoles, setViewRoles] = useState([]);
  const [viewVisibility, setViewVisibility] = useState(CONST.VIEWS_VISIBILITY.PRIVATE);
  const [nameInputError, setNameInputError] = useState('');
  const [rolesInputError, setRolesInputError] = useState('');

  useEffect(() => {
    getViews();
  }, []);

  const getViews = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_VIEWS);

    setPrivateViews(data.privateViews);
    setUserViews(data.userViews);
    setSharedViews(data.sharedViews);
  };

  const addView = async (viewData) => {
    await post(CONST.REQUEST_URLS.CREATE_VIEW, viewData);

    getViews();
  };

  const deleteView = async (id) => {
    if (id) {
      await del(`${CONST.REQUEST_URLS.DELETE_VIEW}${id}`);

      getViews();
    }
  };

  const updateView = async (id, viewData) => {
    if (id) {
      await put(`${CONST.REQUEST_URLS.UPDATE_VIEW}${id}`, viewData);

      getViews();
    }
  };

  useEffect(() => {
    getUserRoles();
  }, []);

  useEffect(() => {
    resetForm();
  }, [showCreateModal]);

  useEffect(() => {
    setFormErrors();
  }, [viewName, viewVisibility, viewRoles]);

  const getUserRoles = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_ROLES);

    setUserRoles(data);
  };

  const resetForm = () => {
    setViewName('');
    setViewVisibility(CONST.VIEWS_VISIBILITY.PRIVATE);
    setViewRoles([]);
    setNameInputError('');
    setRolesInputError('');
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

    if (viewRoles.length || viewVisibility !== CONST.VIEWS_VISIBILITY.ROLES) {
      setRolesInputError('');
    }
  };

  return {
    privateViews,
    setPrivateViews,
    userViews,
    setUserViews,
    sharedViews,
    setSharedViews,
    userRoles,
    setUserRoles,
    showCreateModal,
    setShowCreateModal,
    showDeleteModal,
    setShowDeleteModal,
    viewToDelete,
    setViewToDelete,
    viewsPopoverVisible,
    setViewsPopoverVisible,
    viewName,
    setViewName,
    viewRoles,
    setViewRoles,
    viewVisibility,
    setViewVisibility,
    nameInputError,
    setNameInputError,
    rolesInputError,
    setRolesInputError,
    addView,
    deleteView,
    updateView
  };
};

export default useViews;
