import React, { useContext } from 'react';

import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Typography
} from '@strapi/design-system';

import CreateUpdateViewForm from '../CreateUpdateViewForm';

import useTranslate from '../../hooks/translations/useTranslate';
import { ViewsContext } from '../../hooks/views/ViewsContext';

const UpdateViewModal = () => {
  const { translate } = useTranslate();
  const {
    viewToUpdate,
    setViewToUpdate,
    setShowUpdateModal,
    viewName,
    viewVisibility,
    viewRoles,
    updateView,
    validateForm
  } = useContext(ViewsContext);

  const MODAL_TITLE_ID = 'update-view-title';

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    try {
      await updateView(viewToUpdate.id, {
        name: viewName,
        visibility: viewVisibility,
        roles: viewRoles
      });

      setShowUpdateModal(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const closeModal = () => {
    setShowUpdateModal(false);
    setViewToUpdate(null);
  };

  return (
    <ModalLayout
      labelledBy={MODAL_TITLE_ID}
      onClose={() => closeModal()}
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography textColor="neutral800" as="h2" variant="beta" id={MODAL_TITLE_ID}>
          {translate('UpdateViewModal.ModalHeader.title')}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <CreateUpdateViewForm />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => closeModal()} variant="tertiary">
            {translate('CreateViewModal.ModalFooter.cancel')}
          </Button>
        }
        endActions={
          <Button type="sumbit" variant="primary">
            {translate('CreateViewModal.ModalFooter.confirm')}
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default UpdateViewModal;
