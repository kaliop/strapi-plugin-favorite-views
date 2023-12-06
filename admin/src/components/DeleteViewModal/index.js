import React, { useContext } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  Typography
} from '@strapi/design-system';
import { ExclamationMarkCircle, Trash } from '@strapi/icons';

import useTranslate from '../../hooks/translations/useTranslate';
import { ViewsContext } from '../../hooks/views/ViewsContext';

const DeleteViewModal = () => {
  const { translate } = useTranslate();
  const { showDeleteModal, setShowDeleteModal, viewToDelete, deleteView } =
    useContext(ViewsContext);

  const handleViewDelete = async () => {
    await deleteView(viewToDelete?.id);

    setShowDeleteModal(false);
  };

  return (
    <Dialog
      title={translate('DeleteViewModal.ModalHeader.title')}
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column">
          <Typography as="p">{translate('DeleteViewModal.ModalBody.message1')}</Typography>
          <Box marginTop={2} marginBottom={2}>
            <Typography padding={2} as="p" textAlign="center" variant="delta">
              {viewToDelete?.name}
            </Typography>
          </Box>
          <Typography as="p">{translate('DeleteViewModal.ModalBody.message2')}</Typography>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setShowDeleteModal(false)} variant="tertiary">
            {translate('DeleteViewModal.ModalFooter.cancel')}
          </Button>
        }
        endAction={
          <Button onClick={handleViewDelete} variant="danger-light" startIcon={<Trash />}>
            {translate('DeleteViewModal.ModalFooter.confirm')}
          </Button>
        }
      />
    </Dialog>
  );
};

export default DeleteViewModal;
