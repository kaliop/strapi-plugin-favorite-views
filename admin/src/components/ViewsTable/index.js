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
import { Trash } from '@strapi/icons';

import { ViewsContext } from '../../hooks/views/ViewsContext';

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
  showActions: PropTypes.boolean
};

const TableRow = ({ view, showActions }) => {
  const { formatMessage } = useIntl();

  const { setShowDeleteModal, setViewToDelete } = useContext(ViewsContext);

  const deleteView = (view) => {
    setShowDeleteModal(true);
    setViewToDelete(view);
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
      {showActions && (
        <Td>
          <Flex justifyContent="right" gap={1}>
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
  showActions: PropTypes.boolean
};

const ViewsTable = ({ views, showActions }) => {
  const COL_COUNT = showActions ? 3 : 2;
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
  showActions: PropTypes.boolean
};

export default ViewsTable;
