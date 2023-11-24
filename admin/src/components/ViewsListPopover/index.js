import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import { Box, Popover, Typography } from '@strapi/design-system';
import { Link } from '@strapi/design-system/v2';

import { ViewsWidgetContext } from '../../hooks/viewsWidget/ViewsWidgetContext';

const ViewsListPopover = ({ views, viewsButtonRef }) => {
  const { formatMessage } = useIntl();
  const { setViewsPopoverVisible } = useContext(ViewsWidgetContext);

  return (
    <Popover
      source={viewsButtonRef}
      spacing={4}
      placement="bottom-end"
      onDismiss={() => setViewsPopoverVisible(false)}
    >
      <ul>
        {views.length ? (
          views.map((view) => (
            <Box as="li" key={view.id} padding={2}>
              <Link as={NavLink} to={view.slug}>
                {view.name}
              </Link>
            </Box>
          ))
        ) : (
          <Box as="li" padding={2}>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('ViewsWidget.ViewsPopover.emptyList')
              })}
            </Typography>
          </Box>
        )}
      </ul>
    </Popover>
  );
};

ViewsListPopover.propTypes = {
  views: PropTypes.array.isRequired,
  viewsButtonRef: PropTypes.object.isRequired
};

export default ViewsListPopover;
