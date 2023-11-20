import React from 'react';
import PropTypes from 'prop-types';
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

const DeleteViewModal = ({ setShowDeleteModal, viewToDelete, onDeleteView }) => {
  const { formatMessage } = useIntl();
  const MODAL_TITLE_ID = 'delete-view-title';

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await onDeleteView(viewToDelete?.id);

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

DeleteViewModal.propTypes = {
  setShowDeleteModal: PropTypes.func.isRequired,
  viewToDelete: PropTypes.object.isRequired,
  onDeleteView: PropTypes.func.isRequired
};

export default DeleteViewModal;
