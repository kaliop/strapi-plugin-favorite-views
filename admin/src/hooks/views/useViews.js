import { useEffect, useState } from 'react';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import useTranslate from '../translations/useTranslate';

import CONST from '../../CONST';

const useViews = () => {
  const { get, post, del, put } = useFetchClient();
  const { translate } = useTranslate();
  const toggleNotification = useNotification();

  const [privateViews, setPrivateViews] = useState([]);
  const [userViews, setUserViews] = useState([]);
  const [sharedViews, setSharedViews] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewToUpdate, setViewToUpdate] = useState(null);
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
    try {
      await post(CONST.REQUEST_URLS.CREATE_VIEW, viewData);

      getViews();

      toggleNotification({
        type: CONST.NOTIFICATION_TYPES.SUCCESS,
        message: translate('Notifications.addView.success')
      });
    } catch (error) {
      toggleNotification({
        type: CONST.NOTIFICATION_TYPES.DANGER,
        message: translate('Notifications.addView.error')
      });
    }
  };

  const deleteView = async (id) => {
    try {
      await del(`${CONST.REQUEST_URLS.DELETE_VIEW}${id}`);

      getViews();

      toggleNotification({
        type: CONST.NOTIFICATION_TYPES.SUCCESS,
        message: translate('Notifications.deleteView.success')
      });
    } catch (error) {
      toggleNotification({
        type: CONST.NOTIFICATION_TYPES.DANGER,
        message: translate('Notifications.deleteView.error')
      });
    }
  };

  const updateView = async (id, viewData) => {
    try {
      await put(`${CONST.REQUEST_URLS.UPDATE_VIEW}${id}`, viewData);

      getViews();

      toggleNotification({
        type: CONST.NOTIFICATION_TYPES.SUCCESS,
        message: translate('Notifications.updateView.success')
      });
    } catch (error) {
      toggleNotification({
        type: CONST.NOTIFICATION_TYPES.DANGER,
        message: translate('Notifications.updateView.error')
      });
    }
  };

  useEffect(() => {
    getUserRoles();
  }, []);

  useEffect(() => {
    resetForm();
  }, [showCreateModal]);

  useEffect(() => {
    fillUpdateFormFields();
  }, [viewToUpdate]);

  useEffect(() => {
    setFormErrors();
  }, [viewName, viewVisibility, viewRoles]);

  const getUserRoles = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_ROLES);

    setUserRoles(data);
  };

  const fillUpdateFormFields = () => {
    setViewName(viewToUpdate?.name || '');
    setViewVisibility(viewToUpdate?.visibility || CONST.VIEWS_VISIBILITY.PRIVATE);
    setViewRoles(viewToUpdate?.roles || []);
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
      setNameInputError(translate('CreateUpdateViewForm.NameInput.hint'));
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
    showUpdateModal,
    setShowUpdateModal,
    showDeleteModal,
    setShowDeleteModal,
    viewToUpdate,
    setViewToUpdate,
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
