import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  MultiSelect,
  MultiSelectOption,
  Radio,
  RadioGroup,
  TextInput,
  Typography
} from '@strapi/design-system';

import CONST from '../../CONST';

const CreateViewForm = ({
  userRoles,
  name,
  setName,
  visibility,
  setVisibility,
  roles,
  setRoles
}) => {
  const { formatMessage } = useIntl();

  return (
    <Flex gap={6} direction="column" alignItems="stretch">
      <TextInput
        name={name}
        label={formatMessage({
          id: getTrad('CreateViewModal.ModalBody.nameInputLabel')
        })}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Grid>
        <GridItem col={6}>
          <Box as="fieldset">
            <Flex direction="column" gap={1} alignItems="stretch">
              <Typography as="legend" variant="pi" textColor="neutral800" fontWeight="bold">
                {formatMessage({
                  id: getTrad(`CreateViewModal.ModalBody.Visibility.label`)
                })}
              </Typography>
              <RadioGroup
                labelledBy="trophy-champions"
                onChange={(e) => setVisibility(e.target.value)}
                value={visibility}
                name="visibility"
              >
                {Object.entries(CONST.VIEWS_VISIBILITY).map(([key, value]) => (
                  <Radio key={`visibility-${key}`} value={value}>
                    {formatMessage({
                      id: getTrad(`CreateViewModal.ModalBody.Visibility.${value}`)
                    })}
                  </Radio>
                ))}
              </RadioGroup>
            </Flex>
          </Box>
        </GridItem>
        {visibility === CONST.VIEWS_VISIBILITY.ROLES && (
          <GridItem col={6}>
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
              required={visibility === CONST.VIEWS_VISIBILITY.ROLES}
            >
              {userRoles.map((role) => (
                <MultiSelectOption key={role.id} value={role.code}>
                  {role.name}
                </MultiSelectOption>
              ))}
            </MultiSelect>
          </GridItem>
        )}
      </Grid>
    </Flex>
  );
};

CreateViewForm.propTypes = {
  userRoles: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  visibility: PropTypes.string.isRequired,
  setVisibility: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  setRoles: PropTypes.func.isRequired
};

export default CreateViewForm;
