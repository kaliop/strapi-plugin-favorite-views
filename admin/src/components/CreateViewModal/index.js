import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

import CONST from '../../CONST';

const CreateViewModal = ({ userRoles, setShowCreateModal, addView }) => {
  const { formatMessage } = useIntl();

  const MODAL_TITLE_ID = 'create-view-title';
  const ADMIN_PATH = '/admin';

  const [name, setName] = useState('');
  const [roles, setRoles] = useState([]);
  const [visibility, setVisibility] = useState(CONST.VIEWS_VISIBILITY.PRIVATE);

  const { pathname, search } = window.location;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const path = pathname.replace(ADMIN_PATH, '');
    const params = search;
    const slug = `${path}${params}`;

    try {
      await addView({ name, slug, roles });

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
        <CreateViewForm
          userRoles={userRoles}
          name={name}
          setName={setName}
          visibility={visibility}
          setVisibility={setVisibility}
          roles={roles}
          setRoles={setRoles}
        />
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

CreateViewModal.propTypes = {
  userRoles: PropTypes.array.isRequired,
  setShowCreateModal: PropTypes.func.isRequired,
  addView: PropTypes.func.isRequired
};

export default CreateViewModal;
