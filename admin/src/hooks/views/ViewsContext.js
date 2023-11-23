import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useViews from './useViews';

const ViewsContext = createContext(null);

const ViewsProvider = ({ children }) => {
  const {
    userViews,
    sharedViews,
    showDeleteModal,
    setShowDeleteModal,
    addView,
    deleteView,
    viewToDelete,
    setViewToDelete
  } = useViews();

  return (
    <ViewsContext.Provider
      value={{
        userViews,
        sharedViews,
        showDeleteModal,
        setShowDeleteModal,
        addView,
        deleteView,
        viewToDelete,
        setViewToDelete
      }}
    >
      {children}
    </ViewsContext.Provider>
  );
};

ViewsProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { ViewsContext, ViewsProvider };
