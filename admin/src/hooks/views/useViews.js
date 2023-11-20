import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';

const useViews = () => {
  const { get, del } = useFetchClient();

  const [views, setViews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewToDelete, setViewToDelete] = useState(null);

  useEffect(() => {
    getViews();
  }, []);

  const getViews = async () => {
    const requestURL = '/favorite-views/find';

    const { data } = await get(requestURL);

    setViews(data);
  };

  const deleteView = async (id) => {
    if (id) {
      const requestURL = `/favorite-views/delete/${id}`;

      await del(requestURL);

      getViews();
    }
  };

  return {
    views,
    setViews,
    getViews,
    deleteView,
    showDeleteModal,
    setShowDeleteModal,
    viewToDelete,
    setViewToDelete
  };
};

export default useViews;
