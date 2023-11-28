import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
  Box,
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Typography,
  VisuallyHidden
} from '@strapi/design-system';
import { Link } from '@strapi/design-system/v2';
import { Pencil, Trash } from '@strapi/icons';

import { ViewsContext } from '../../hooks/views/ViewsContext';

import CONST from '../../CONST';

const TableHead = ({ showActions }) => {
  const { formatMessage } = useIntl();

  return (
    <Thead>
      <Tr>
        <Th>
          <Typography variant="sigma">
            {formatMessage({
              id: getTrad('ViewsTable.TableHead.id')
            })}
          </Typography>
        </Th>
        <Th>
          <Typography variant="sigma">
            {formatMessage({
              id: getTrad('ViewsTable.TableHead.name')
            })}
          </Typography>
        </Th>
        <Th>
          <Typography variant="sigma">
            {formatMessage({
              id: getTrad('ViewsTable.TableHead.visibility')
            })}
          </Typography>
        </Th>
        {showActions && (
          <Th>
            <VisuallyHidden>
              {formatMessage({
                id: getTrad('ViewsTable.TableHead.actions')
              })}
            </VisuallyHidden>
          </Th>
        )}
      </Tr>
    </Thead>
  );
};

TableHead.propTypes = {
  showActions: PropTypes.bool
};

const TableRow = ({ view, showActions }) => {
  const { formatMessage } = useIntl();

  const { userRoles, setShowUpdateModal, setViewToUpdate, setShowDeleteModal, setViewToDelete } =
    useContext(ViewsContext);

  const deleteView = (view) => {
    setViewToDelete(view);
    setShowDeleteModal(true);
  };

  const updateView = (view) => {
    setViewToUpdate(view);
    setShowUpdateModal(true);
  };

  const formattedVisibility = () => {
    if (view.visibility !== CONST.VIEWS_VISIBILITY.ROLES) {
      return formatMessage({
        id: getTrad(`ViewsTable.TableRow.visibility.${view.visibility}`)
      });
    }

    let rolesVisibility = [];

    view.roles.map((role) => {
      const existingRole = userRoles.find((userRole) => userRole.code === role);

      rolesVisibility.push(` ${existingRole?.name}`);
    });

    return rolesVisibility.toString();
  };

  const formattedVisibility = () => {
    if (view.visibility !== CONST.VIEWS_VISIBILITY.ROLES) {
      return formatMessage({
        id: getTrad(`ViewsTable.TableRow.visibility.${view.visibility}`)
      });
    }

    let rolesList = [];

    view.roles.map((role) => {
      const existingRole = userRoles.find((userRole) => userRole.code === role);

      rolesList.push(` ${existingRole?.name}`);
    });

    return rolesList.toString();
  };

  return (
    <Tr>
      <Td>
        <Typography textColor="neutral800">{view.id}</Typography>
      </Td>
      <Td>
        <Box paddingTop={2} paddingBottom={2}>
          <Link as={NavLink} to={view.slug}>
            {view.name}
          </Link>
        </Box>
      </Td>
      <Td>
        <Typography color="neutral800">{formattedVisibility()}</Typography>
      </Td>
      {showActions && (
        <Td>
          <Flex justifyContent="right" gap={1}>
            <IconButton
              onClick={() => updateView(view)}
              label={formatMessage({
                id: getTrad('ViewsTable.TableRow.update')
              })}
              noBorder
              icon={<Pencil />}
            />
            <IconButton
              onClick={() => deleteView(view)}
              label={formatMessage({
                id: getTrad('ViewsTable.TableRow.delete')
              })}
              noBorder
              icon={<Trash />}
            />
          </Flex>
        </Td>
      )}
    </Tr>
  );
};

TableRow.propTypes = {
  view: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const ViewsTable = ({ views, showActions }) => {
  const COL_COUNT = showActions ? 4 : 3;
  const ROW_COUNT = views.length;

  return (
    <>
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <TableHead showActions={showActions || null} />
        <Tbody>
          {views.map((view) => (
            <TableRow key={view.id} view={view} showActions={showActions || null} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

ViewsTable.propTypes = {
  views: PropTypes.array.isRequired,
  showActions: PropTypes.bool
};

export default ViewsTable;
