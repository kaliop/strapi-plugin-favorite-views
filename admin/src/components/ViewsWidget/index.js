import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import { Button, Flex } from '@strapi/design-system';
import { List, Plus } from '@strapi/icons';

import ViewsListPopover from '../ViewsListPopover';
import CreateViewModal from '../CreateViewModal';

import useViewsWidget from '../../hooks/viewsWidget/useViewsWidget';
import useViews from '../../hooks/views/useViews';

const ViewsWidget = () => {
  const { formatMessage } = useIntl();
  const { viewsMenuVisible, setViewsMenuVisible, showCreateModal, setShowCreateModal } =
    useViewsWidget();
  const { userViews, addView } = useViews();
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
          onClick={() => setViewsMenuVisible((s) => !s)}
        >
          {formatMessage({
            id: getTrad('ViewsWidget.actions.showList')
          })}
        </Button>
      </Flex>
      {viewsMenuVisible && (
        <ViewsListPopover
          viewsButtonRef={viewsButtonRef}
          views={userViews}
          setViewsMenuVisible={setViewsMenuVisible}
        />
      )}
      {showCreateModal && (
        <CreateViewModal setShowCreateModal={setShowCreateModal} addView={addView} />
      )}
    </>
  );
};

export default ViewsWidget;
