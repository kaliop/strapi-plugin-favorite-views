import React, { useRef, useState } from 'react';

import { Button, Flex } from '@strapi/design-system';
import { List } from '@strapi/icons';

import ViewsListPopover from '../ViewsListPopover';

import useViews from '../../hooks/views/useViews';

const ViewsWidget = () => {
  const { views } = useViews();

  const [viewsMenuVisible, setViewsMenuVisible] = useState(false);

  const viewsButtonRef = useRef(null);

  return (
    <>
      <Flex gap={2} marginRight={1}>
        <Button
          ref={viewsButtonRef}
          variant="tertiary"
          startIcon={<List />}
          onClick={() => setViewsMenuVisible((s) => !s)}
        >
          Views List
        </Button>
      </Flex>
      {viewsMenuVisible && (
        <ViewsListPopover
          viewsButtonRef={viewsButtonRef}
          views={views}
          setViewsMenuVisible={setViewsMenuVisible}
        />
      )}
    </>
  );
};

export default ViewsWidget;
