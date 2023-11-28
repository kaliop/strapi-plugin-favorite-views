import React, { useContext, useRef } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import { Button, Flex } from '@strapi/design-system';
import { List, Plus } from '@strapi/icons';

import ViewsListPopover from '../ViewsListPopover';
import CreateViewModal from '../CreateViewModal';

import { ViewsContext } from '../../hooks/views/ViewsContext';

const ViewsWidget = () => {
  const { formatMessage } = useIntl();
  const {
    privateViews,
    viewsPopoverVisible,
    setViewsPopoverVisible,
    showCreateModal,
    setShowCreateModal
  } = useContext(ViewsContext);

  const viewsButtonRef = useRef(null);

  return (
    <>
      <Flex gap={2} marginRight={1}>
        <Button variant="tertiary" startIcon={<Plus />} onClick={() => setShowCreateModal(true)}>
          {formatMessage({
            id: getTrad('ViewsWidget.actions.create')
          })}
        </Button>
        <Button
          ref={viewsButtonRef}
          variant="tertiary"
          startIcon={<List />}
          onClick={() => setViewsPopoverVisible((s) => !s)}
        >
          {formatMessage({
            id: getTrad('ViewsWidget.actions.showList')
          })}
        </Button>
      </Flex>
      {viewsPopoverVisible && (
        <ViewsListPopover viewsButtonRef={viewsButtonRef} views={privateViews} />
      )}
      {showCreateModal && <CreateViewModal />}
    </>
  );
};

export default ViewsWidget;
