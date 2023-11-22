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
  setRoles,
  nameInputError,
  rolesInputError
}) => {
  const { formatMessage } = useIntl();

  return (
    <Flex gap={6} direction="column" alignItems="stretch">
      <TextInput
        name={name}
        label={formatMessage({
          id: getTrad('CreateViewForm.NameInput.label')
        })}
        hint={formatMessage({
          id: getTrad('CreateViewForm.NameInput.hint')
        })}
        error={nameInputError}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Grid gap={6}>
        <GridItem col={6}>
          <Box as="fieldset">
            <Flex direction="column" gap={1} alignItems="stretch">
              <Typography as="legend" variant="pi" textColor="neutral800" fontWeight="bold">
                {formatMessage({
                  id: getTrad(`CreateViewForm.VisibilityInput.label`)
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
                      id: getTrad(`CreateViewForm.VisibilityInput.${value}`)
                    })}
                  </Radio>
                ))}
              </RadioGroup>
            </Flex>
          </Box>
        </GridItem>
        <GridItem col={6}>
          <MultiSelect
            label={formatMessage({
              id: getTrad('CreateViewForm.RolesInput.label')
            })}
            placeholder={formatMessage({
              id: getTrad('CreateViewForm.RolesInput.placeholder')
            })}
            onClear={() => {
              setRoles([]);
            }}
            value={roles}
            onChange={setRoles}
            error={rolesInputError}
            withTags
            disabled={visibility !== CONST.VIEWS_VISIBILITY.ROLES}
            required={visibility === CONST.VIEWS_VISIBILITY.ROLES}
          >
            {userRoles.map((role) => (
              <MultiSelectOption key={role.id} value={role.code}>
                {role.name}
              </MultiSelectOption>
            ))}
          </MultiSelect>
        </GridItem>
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
  setRoles: PropTypes.func.isRequired,
  nameInputError: PropTypes.string.isRequired,
  rolesInputError: PropTypes.string.isRequired
};

export default CreateViewForm;
