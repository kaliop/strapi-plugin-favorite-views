import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
  Box,
  Flex,
  IconButton,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Typography,
  VisuallyHidden
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';

const TableHead = () => {
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
          <VisuallyHidden>
            {formatMessage({
              id: getTrad('ViewsTable.TableHead.actions')
            })}
          </VisuallyHidden>
        </Th>
      </Tr>
    </Thead>
  );
};

const TableRow = ({ view, setShowDeleteModal, setViewToDelete }) => {
  const { formatMessage } = useIntl();

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
          <Link href={view.url}>{view.name}</Link>
        </Box>
      </Td>
      <Td>
        <Flex justifyContent="right" gap={1}>
          {setShowDeleteModal && (
            <IconButton
              onClick={() => deleteView(view)}
              label={formatMessage({
                id: getTrad('ViewsTable.TableRow.delete')
              })}
              noBorder
              icon={<Trash />}
            />
          )}
        </Flex>
      </Td>
    </Tr>
  );
};

TableRow.propTypes = {
  view: PropTypes.object.isRequired,
  setShowDeleteModal: PropTypes.func,
  setViewToDelete: PropTypes.func
};

const ViewsTable = ({ views, setShowDeleteModal, setViewToDelete }) => {
  const COL_COUNT = 3;
  const ROW_COUNT = views.length;

  return (
    <>
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <TableHead />
        <Tbody>
          {views.map((view) => (
            <TableRow
              key={view.id}
              view={view}
              setShowDeleteModal={setShowDeleteModal}
              setViewToDelete={setViewToDelete}
            />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

ViewsTable.propTypes = {
  views: PropTypes.array.isRequired,
  setShowDeleteModal: PropTypes.func,
  setViewToDelete: PropTypes.func
};

export default ViewsTable;
