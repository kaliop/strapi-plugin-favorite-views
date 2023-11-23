import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
  Box,
  Button,
  Flex,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';

import { ViewsContext } from '../../hooks/views/ViewsContext';

const DeleteViewModal = () => {
  const { formatMessage } = useIntl();
  const { setShowDeleteModal, viewToDelete, deleteView } = useContext(ViewsContext);

  const MODAL_TITLE_ID = 'delete-view-title';

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await deleteView(viewToDelete?.id);

    setShowDeleteModal(false);
  };

  return (
    <ModalLayout
      labelledBy={MODAL_TITLE_ID}
      onClose={() => setShowDeleteModal(false)}
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography textColor="neutral800" as="h2" variant="beta" id={MODAL_TITLE_ID}>
          {formatMessage({
            id: getTrad('DeleteViewModal.ModalHeader.title')
          })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Flex direction="column">
          <Typography as="p">
            {formatMessage({
              id: getTrad('DeleteViewModal.ModalBody.message1')
            })}
          </Typography>
          <Box marginTop={2} marginBottom={2}>
            <Typography padding={2} as="p" textAlign="center" fontWeight="bold">
              {viewToDelete?.name}
            </Typography>
          </Box>
          <Typography as="p">
            {formatMessage({
              id: getTrad('DeleteViewModal.ModalBody.message2')
            })}
          </Typography>
        </Flex>
      </ModalBody>
      <ModalFooter
        endActions={
          <>
            <Button onClick={() => setShowDeleteModal(false)} variant="tertiary">
              {formatMessage({
                id: getTrad('DeleteViewModal.ModalFooter.cancel')
              })}
            </Button>
            <Button type="submit" variant="danger-light" startIcon={<Trash />}>
              {formatMessage({
                id: getTrad('DeleteViewModal.ModalFooter.confirm')
              })}
            </Button>
          </>
        }
      />
    </ModalLayout>
  );
};

export default DeleteViewModal;
