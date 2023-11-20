import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Box, Popover, Link } from '@strapi/design-system';

const ViewsListPopover = ({ views, viewsButtonRef, setViewsMenuVisible }) => {
  return (
    <Popover
      source={viewsButtonRef}
      spacing={4}
      placement="bottom-end"
      onDismiss={() => setViewsMenuVisible(false)}
    >
      <ul
        style={{
          width: '150px'
        }}
      >
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
  viewsButtonRef: PropTypes.object.isRequired,
  setViewsMenuVisible: PropTypes.func.isRequired
};

export default ViewsListPopover;
