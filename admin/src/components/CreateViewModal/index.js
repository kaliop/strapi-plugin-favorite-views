import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import { ViewsContext } from '../../hooks/views/ViewsContext';

import {
  Button,
  Flex,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  MultiSelect,
  MultiSelectOption,
  TextInput,
  Typography
} from '@strapi/design-system';

const CreateViewModal = ({ userRoles, setShowCreateModal }) => {
  const { formatMessage } = useIntl();
  const { addView } = useContext(ViewsContext);

  const MODAL_TITLE_ID = 'create-view-title';
  const ADMIN_PATH = '/admin';

  const [name, setName] = useState('');
  const [roles, setRoles] = useState([]);

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
        <Flex gap={6} direction="column" alignItems="stretch">
          <TextInput
            name={name}
            label={formatMessage({
              id: getTrad('CreateViewModal.ModalBody.nameInputLabel')
            })}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <MultiSelect
            label={formatMessage({
              id: getTrad('CreateViewModal.ModalBody.rolesInputLabel')
            })}
            placeholder={formatMessage({
              id: getTrad('CreateViewModal.ModalBody.rolesInputPlaceholder')
            })}
            onClear={() => {
              setRoles([]);
            }}
            value={roles}
            onChange={setRoles}
            withTags
          >
            {userRoles.map((role) => (
              <MultiSelectOption key={role.id} value={role.code}>
                {role.name}
              </MultiSelectOption>
            ))}
          </MultiSelect>
        </Flex>
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
  setShowCreateModal: PropTypes.func.isRequired
};

export default CreateViewModal;
