import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
import { useFetchClient } from '@strapi/helper-plugin';

import { Button, Flex } from '@strapi/design-system';
import { List, Plus } from '@strapi/icons';

import ViewsListPopover from '../ViewsListPopover';
import CreateViewModal from '../CreateViewModal';

import useViews from '../../hooks/views/useViews';

const ViewsWidget = () => {
  const { formatMessage } = useIntl();
  const { post } = useFetchClient();
  const { views, getViews } = useViews();

  const [viewsMenuVisible, setViewsMenuVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const viewsButtonRef = useRef(null);

  const addView = async (viewData) => {
    const requestURL = '/favorite-views/create';

    await post(requestURL, viewData);

    getViews();
  };

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
          views={views}
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
