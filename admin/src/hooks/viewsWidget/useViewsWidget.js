import { useState } from 'react';

const useViewsWidget = () => {
  const [viewsMenuVisible, setViewsMenuVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return {
    viewsMenuVisible,
    setViewsMenuVisible,
    showCreateModal,
    setShowCreateModal
  };
};

export default useViewsWidget;
