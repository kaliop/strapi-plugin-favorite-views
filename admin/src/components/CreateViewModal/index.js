import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography
} from '@strapi/design-system';

import CreateViewForm from '../CreateViewForm';

import { ViewsContext } from '../../hooks/views/ViewsContext';

import CONST from '../../CONST';

const CreateViewModal = () => {
  const { formatMessage } = useIntl();
  const {
    addView,
    setShowCreateModal,
    viewName,
    viewRoles,
    viewVisibility,
    setNameInputError,
    setRolesInputError
  } = useContext(ViewsContext);

  const MODAL_TITLE_ID = 'create-view-title';
  const ADMIN_PATH = '/admin';

  const { pathname, search } = window.location;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!viewName) {
      setNameInputError('Ce champ est obligatoire');

      return;
    }

    if (viewName.length > 32) return;

    if (viewVisibility === CONST.VIEWS_VISIBILITY.ROLES && !viewRoles.length) {
      setRolesInputError(
        formatMessage({
          id: getTrad('CreateViewForm.RolesInput.emptyError')
        })
      );

      return;
    }

    const path = pathname.replace(ADMIN_PATH, '');
    const params = search;
    const slug = `${path}${params}`;

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
          {formatMessage({
            id: getTrad('CreateViewModal.ModalHeader.title')
          })}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <CreateViewForm />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => setShowCreateModal(false)} variant="tertiary">
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

export default CreateViewModal;
