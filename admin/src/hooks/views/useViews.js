import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';

const useViews = () => {
  const { get, del, put } = useFetchClient();

  const [userViews, setUserViews] = useState([]);
  const [sharedViews, setSharedViews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewToDelete, setViewToDelete] = useState(null);

  useEffect(() => {
    getViews();
  }, []);

  const getViews = async () => {
    const requestURL = '/favorite-views/find';

    const { data } = await get(requestURL);

    setUserViews(data.userViews);
    setSharedViews(data.sharedViews);
  };

  const deleteView = async (id) => {
    if (id) {
      const requestURL = `/favorite-views/delete/${id}`;

      await del(requestURL);

      getViews();
    }
  };

  const updateView = async (id, viewData) => {
    if (id) {
      const requestURL = `/favorite-views/update/${id}`;

      await put(requestURL, viewData);

      getViews();
    }
  };

  return {
    userViews,
    setUserViews,
    sharedViews,
    setSharedViews,
    getViews,
    deleteView,
    updateView,
    showDeleteModal,
    setShowDeleteModal,
    viewToDelete,
    setViewToDelete
  };
};

export default useViews;
