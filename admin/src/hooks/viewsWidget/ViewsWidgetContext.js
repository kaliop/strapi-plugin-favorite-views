import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useViewsWidget from './useViewsWidget';

const ViewsWidgetContext = createContext(null);

const ViewsWidgetProvider = ({ children }) => {
  const {
    viewsPopoverVisible,
    setViewsPopoverVisible,
    showCreateModal,
    setShowCreateModal,
    userRoles,
    setUserRoles,
    viewName,
    setViewName,
    viewRoles,
    setViewRoles,
    viewVisibility,
    setViewVisibility,
    nameInputError,
    setNameInputError,
    rolesInputError,
    setRolesInputError
  } = useViewsWidget();

  return (
    <ViewsWidgetContext.Provider
      value={{
        viewsPopoverVisible,
        setViewsPopoverVisible,
        showCreateModal,
        setShowCreateModal,
        userRoles,
        setUserRoles,
        viewName,
        setViewName,
        viewRoles,
        setViewRoles,
        viewVisibility,
        setViewVisibility,
        nameInputError,
        setNameInputError,
        rolesInputError,
        setRolesInputError
      }}
    >
      {children}
    </ViewsWidgetContext.Provider>
  );
};

ViewsWidgetProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export { ViewsWidgetContext, ViewsWidgetProvider };
