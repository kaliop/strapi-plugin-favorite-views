import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Typography
} from '@strapi/design-system';

import CreateUpdateViewForm from '../CreateUpdateViewForm';

import { ViewsContext } from '../../hooks/views/ViewsContext';

import CONST from '../../CONST';

const UpdateViewModal = () => {
  const { formatMessage } = useIntl();
  const {
    viewToUpdate,
    setViewToUpdate,
    setShowUpdateModal,
    viewName,
    viewVisibility,
    viewRoles,
    setNameInputError,
    setRolesInputError,
    updateView
  } = useContext(ViewsContext);

  const MODAL_TITLE_ID = 'update-view-title';

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!viewName) {
      setNameInputError(
        formatMessage({
          id: getTrad('CreateUpdateViewForm.NameInput.emptyError')
        })
      );

      return;
    }

    if (viewName.length > 32) return;

    if (viewVisibility === CONST.VIEWS_VISIBILITY.ROLES && !viewRoles.length) {
      setRolesInputError(
        formatMessage({
          id: getTrad('CreateUpdateViewForm.RolesInput.emptyError')
        })
      );

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
          {formatMessage({
            id: getTrad('UpdateViewModal.ModalHeader.title')
          })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <CreateUpdateViewForm />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => closeModal()} variant="tertiary">
            {formatMessage({
              id: getTrad('CreateViewModal.ModalFooter.cancel')
            })}
          </Button>
        }
        endActions={
          <Button type="sumbit" variant="primary">
            {formatMessage({
              id: getTrad('CreateViewModal.ModalFooter.confirm')
            })}
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default UpdateViewModal;
