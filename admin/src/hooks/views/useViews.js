import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import useTranslate from '../translations/useTranslate';

import CONST from '../../CONST';
import { formSchema } from './schema';
import { useHistory, useLocation } from 'react-router-dom';

const useViews = () => {
  const { get, post, del, put } = useFetchClient();
  const { translate } = useTranslate();
  const toggleNotification = useNotification();

  const history = useHistory();
  const location = useLocation();

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

  const [privateViews, setPrivateViews] = useState([]);

  const [views, setViews] = useState([]);
  const [tabsIndex, setTabsIndex] = useState(CONST.TABS_INDEX.userViewsTab);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewsPagination, setViewsPagination] = useState({
    count: 0,
    totalPages: 0
  });
  const [fetchParams, setFetchParams] = useState({
    currentPage: 1,
    viewsPerPage: 10
  });

  useEffect(() => {
    setFetchParams({
      currentPage: 1,
      viewsPerPage: 10
    });
    history.push(`?page=1&pageSize=10&sortBy=createdAt:asc`);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = Number(query.get('page'));
    const pageSize = Number(query.get('pageSize'));

    setFetchParams({
      currentPage: page,
      viewsPerPage: pageSize
    });

    if (tabsIndex === CONST.TABS_INDEX.userViewsTab) {
      getUserViews(page, pageSize);
    }
    if (tabsIndex === CONST.TABS_INDEX.sharedViewsTab) {
      getSharedViews(page, pageSize);
    }
  }, [location, tabsIndex]);

  useEffect(() => {
    getPrivateViews();
  }, []);

  const getUserViews = useCallback(
    async (page = 1, pageSize = 10) => {
      const response = await get(
        `${CONST.REQUEST_URLS.GET_USER_VIEWS}?page=${page}&pageSize=${pageSize}&sortBy=createdAt:asc`
      );

      const { userViewsData, pagination } = response.data;
      setViews(userViewsData || []);
      setViewsPagination({
        count: Number(pagination.count),
        totalPages: Number(pagination.totalPages)
      });
    },
    [fetchParams]
  );

  const getSharedViews = useCallback(
    async (page = 1, pageSize = 10) => {
      const response = await get(
        `${CONST.REQUEST_URLS.GET_SHARED_VIEWS}?page=${page}&pageSize=${pageSize}&sortBy=createdAt:asc`
      );

      const { sharedViewsData, pagination } = response.data;
      setViews(sharedViewsData || []);
      setViewsPagination({
        count: Number(pagination.count),
        totalPages: Number(pagination.totalPages)
      });
    },
    [fetchParams]
  );

  const viewsPagesCount = useMemo(() => viewsPagination.totalPages, [viewsPagination, views]);

  const getPrivateViews = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_PRIVATE_VIEWS);

    setPrivateViews(data.privateViewsData);
  };

  const addView = async (viewData) => {
    try {
      await post(CONST.REQUEST_URLS.CREATE_VIEW, viewData);

      getUserViews();
      getSharedViews();
      getPrivateViews();

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

      getUserViews();
      getSharedViews();

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

      getUserViews();
      getSharedViews();

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

  const validateForm = () => {
    const isFormValid = formSchema.safeParse({
      name: viewName,
      visibility: viewVisibility,
      roles: viewRoles
    });

    if (!isFormValid.success) {
      isFormValid.error.errors.forEach((error) => {
        if (error.path.includes('name')) {
          if (error.code === 'too_big') {
            setNameInputError(translate('CreateUpdateViewForm.NameInput.tooBigError'));
          } else {
            setNameInputError(translate('CreateUpdateViewForm.NameInput.emptyError'));
          }
        } else if (error.path.includes('roles')) {
          setRolesInputError(translate('CreateUpdateViewForm.RolesInput.emptyError'));
        }
      });

      return;
    }

    return true;
  };

  return {
    addView,
    deleteView,
    fetchParams,
    itemsPerPage,
    nameInputError,
    privateViews,
    rolesInputError,
    setItemsPerPage,
    setNameInputError,
    setPrivateViews,
    setRolesInputError,
    setShowCreateModal,
    setShowDeleteModal,
    setShowUpdateModal,
    setTabsIndex,
    setUserRoles,
    setViewName,
    setViewRoles,
    setViewsPopoverVisible,
    setViewToDelete,
    setViewToUpdate,
    setViewVisibility,
    showCreateModal,
    showDeleteModal,
    showUpdateModal,
    tabsIndex,
    updateView,
    userRoles,
    validateForm,
    viewName,
    viewRoles,
    views,
    viewsPagesCount,
    viewsPagination,
    viewsPopoverVisible,
    viewToDelete,
    viewToUpdate,
    viewVisibility
  };
};

export default useViews;
