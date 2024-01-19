import React, { useContext } from 'react';

import {
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography
} from '@strapi/design-system';

import CreateUpdateViewForm from '../CreateUpdateViewForm';

import useTranslate from '../../hooks/translations/useTranslate';
import { ViewsContext } from '../../hooks/views/ViewsContext';

const CreateViewModal = () => {
  const { translate } = useTranslate();
  const { addView, setShowCreateModal, viewName, viewRoles, viewVisibility, validateForm } =
    useContext(ViewsContext);

  const MODAL_TITLE_ID = 'create-view-title';

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    const { pathname, search } = window.location;
    const slug = `${pathname}${search}`;

    try {
      await addView({ name: viewName, slug, roles: viewRoles, visibility: viewVisibility });

      setShowCreateModal(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ModalLayout
      labelledBy={MODAL_TITLE_ID}
      onClose={() => setShowCreateModal(false)}
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography textColor="neutral800" as="h2" variant="beta" id={MODAL_TITLE_ID}>
          {translate('CreateViewModal.ModalHeader.title')}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <CreateUpdateViewForm />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => setShowCreateModal(false)} variant="tertiary">
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

export default CreateViewModal;
