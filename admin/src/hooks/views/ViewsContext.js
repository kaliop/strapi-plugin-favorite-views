import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useViews from './useViews';

const ViewsContext = createContext(null);

const ViewsProvider = ({ children }) => {
  const {
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
  } = useViews();

  return (
    <ViewsContext.Provider
      value={{
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
