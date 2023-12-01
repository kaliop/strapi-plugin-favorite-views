import React, { useContext } from 'react';

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

import useTranslate from '../../hooks/translations/useTranslate';
import { ViewsContext } from '../../hooks/views/ViewsContext';

const DeleteViewModal = () => {
  const { translate } = useTranslate();
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
          {translate('DeleteViewModal.ModalHeader.title')}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Flex direction="column">
          <Typography as="p">{translate('DeleteViewModal.ModalBody.message1')}</Typography>
          <Box marginTop={2} marginBottom={2}>
            <Typography padding={2} as="p" textAlign="center" variant="delta">
              {viewToDelete?.name}
            </Typography>
          </Box>
          <Typography as="p">{translate('DeleteViewModal.ModalBody.message2')}</Typography>
        </Flex>
      </ModalBody>
      <ModalFooter
        endActions={
          <>
            <Button onClick={() => setShowDeleteModal(false)} variant="tertiary">
              {translate('DeleteViewModal.ModalFooter.cancel')}
            </Button>
            <Button type="submit" variant="danger-light" startIcon={<Trash />}>
              {translate('DeleteViewModal.ModalFooter.confirm')}
            </Button>
          </>
        }
      />
    </ModalLayout>
  );
};

export default DeleteViewModal;
