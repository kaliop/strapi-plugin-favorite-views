import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useViews from './useViews';

const ViewsContext = createContext(null);

const ViewsProvider = ({ children }) => {
  const {
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
  } = useViews();

  return (
    <ViewsContext.Provider
      value={{
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
