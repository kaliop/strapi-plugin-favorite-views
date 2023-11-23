import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';

import CONST from '../../CONST';

const useViews = () => {
  const { get, post, del, put } = useFetchClient();

  const [userViews, setUserViews] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userSharedViews, setUserSharedViews] = useState([]);
  const [sharedViews, setSharedViews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewToDelete, setViewToDelete] = useState(null);

  useEffect(() => {
    getViews();
  }, []);

  const getViews = async () => {
    const { data } = await get(CONST.REQUEST_URLS.GET_VIEWS);

    setUserViews(data.userPrivateViews);
    setUserSharedViews(data.userSharedViews);
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

  return {
    userViews,
    setUserViews,
    sharedViews,
    setSharedViews,
    getViews,
    addView,
    deleteView,
    updateView,
    showDeleteModal,
    setShowDeleteModal,
    viewToDelete,
    setViewToDelete
  };
};

export default useViews;
