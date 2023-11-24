import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Box, Popover, Link } from '@strapi/design-system';

import { ViewsWidgetContext } from '../../hooks/viewsWidget/ViewsWidgetContext';

const ViewsListPopover = ({ views, viewsButtonRef }) => {
  const { setViewsPopoverVisible } = useContext(ViewsWidgetContext);

  return (
    <Popover
      source={viewsButtonRef}
      spacing={4}
      placement="bottom-end"
      onDismiss={() => setViewsPopoverVisible(false)}
    >
      <ul>
        {views.map((view) => (
          <Box as="li" key={view.id} padding={2}>
            <Link as={NavLink} to={view.slug}>
              {view.name}
            </Link>
          </Box>
        ))}
      </ul>
    </Popover>
  );
};

ViewsListPopover.propTypes = {
  views: PropTypes.array.isRequired,
  viewsButtonRef: PropTypes.object.isRequired
};

export default ViewsListPopover;
