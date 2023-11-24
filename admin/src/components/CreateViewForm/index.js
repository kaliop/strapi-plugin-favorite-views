import React, { useContext } from 'react';
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

import { ViewsWidgetContext } from '../../hooks/viewsWidget/ViewsWidgetContext';

import CONST from '../../CONST';

const CreateViewForm = () => {
  const { formatMessage } = useIntl();
  const {
    userRoles,
    viewName,
    setViewName,
    viewVisibility,
    setViewVisibility,
    viewRoles,
    setViewRoles,
    nameInputError,
    rolesInputError
  } = useContext(ViewsWidgetContext);

  return (
    <Flex gap={6} direction="column" alignItems="stretch">
      <TextInput
        name={viewName}
        label={formatMessage({
          id: getTrad('CreateViewForm.NameInput.label')
        })}
        hint={formatMessage({
          id: getTrad('CreateViewForm.NameInput.hint')
        })}
        error={nameInputError}
        onChange={(e) => setViewName(e.target.value)}
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
                onChange={(e) => setViewVisibility(e.target.value)}
                value={viewVisibility}
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
              setViewRoles([]);
            }}
            value={viewRoles}
            onChange={setViewRoles}
            error={rolesInputError}
            withTags
            disabled={viewVisibility !== CONST.VIEWS_VISIBILITY.ROLES}
            required={viewVisibility === CONST.VIEWS_VISIBILITY.ROLES}
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

export default CreateViewForm;
