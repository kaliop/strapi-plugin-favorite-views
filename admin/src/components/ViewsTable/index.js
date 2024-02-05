import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';

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
  VisuallyHidden,
  SingleSelect,
  SingleSelectOption
} from '@strapi/design-system';
import { Dots, Link, NextLink, PageLink, Pagination, PreviousLink } from '@strapi/design-system/v2';
import { Pencil, Trash } from '@strapi/icons';

import useTranslate from '../../hooks/translations/useTranslate';
import { ViewsContext } from '../../hooks/views/ViewsContext';

import CONST, { ITEMS_PER_PAGE } from '../../CONST';

const TableHead = ({ showActions }) => {
  const { translate } = useTranslate();

  return (
    <Thead>
      <Tr>
        <Th>
          <Typography variant="sigma">{translate('ViewsTable.TableHead.id')}</Typography>
        </Th>
        <Th>
          <Typography variant="sigma">{translate('ViewsTable.TableHead.name')}</Typography>
        </Th>
        <Th>
          <Typography variant="sigma">{translate('ViewsTable.TableHead.visibility')}</Typography>
        </Th>
        {showActions && (
          <Th>
            <VisuallyHidden>{translate('ViewsTable.TableHead.actions')}</VisuallyHidden>
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
  const { translate } = useTranslate();

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
      return translate(`ViewsTable.TableRow.visibility.${view.visibility}`);
    }

    let rolesVisibility = [];

    view.roles.map((role) => {
      const existingRole = userRoles.find((userRole) => userRole.code === role);

      rolesVisibility.push(` ${existingRole?.name}`);
    });

    return rolesVisibility.toString();
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
              label={translate('ViewsTable.TableRow.update')}
              noBorder
              icon={<Pencil />}
            />
            <IconButton
              onClick={() => deleteView(view)}
              label={translate('ViewsTable.TableRow.delete')}
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

export const TableFooter = () => {
  const { viewsPagesCount, fetchParams, itemsPerPage, setItemsPerPage } = useContext(ViewsContext);
  const history = useHistory();

  const { translate } = useTranslate();

  const pagesArray = [];

  for (let i = 1; i <= viewsPagesCount; i++) {
    pagesArray.push(i);
  }

  const pages = pagesArray.map((page, index) => {
    if (index < 3 || index > viewsPagesCount - 4) {
      return (
        <PageLink
          as={NavLink}
          key={index}
          number={page}
          to={`?page=${page}&pageSize=${fetchParams.viewsPerPage}&sortBy=createdAt:asc`}
        >
          {`${translate('HomePage.Table.Footer.Pagination.Page')} ${page}`}
        </PageLink>
      );
    } else if (index === 3 && fetchParams.currentPage < viewsPagesCount - 3) {
      return (
        <Dots key={index}>
          {translate('HomePage.Table.Footer.Pagination.Dots', {
            pageCount: viewsPagesCount - 6
          })}
        </Dots>
      );
    }
  });

  const handleChangeItemsPerPage = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    history.push(`favorite-views?page=1&pageSize=${itemsPerPage}&sortBy=createdAt:asc`);
  };

  return (
    <Flex alignItems="flex-end" justifyContent="space-between">
      <Flex gap={2}>
        <SingleSelect size="S" onChange={handleChangeItemsPerPage} value={itemsPerPage}>
          {ITEMS_PER_PAGE.map((option) => (
            <SingleSelectOption key={option.value} value={option.value}>
              {option.label}
            </SingleSelectOption>
          ))}
        </SingleSelect>
        <Typography textColor="neutral600" as="span">
          {translate('HomePage.Table.Footer.Pagination.Select')}
        </Typography>
      </Flex>
      <Pagination activePage={fetchParams.currentPage} pageCount={fetchParams.viewsPerPage}>
        <PreviousLink
          as={NavLink}
          to={`?page=${fetchParams.currentPage - 1}&pageSize=${
            fetchParams.viewsPerPage
          }&sortBy=createdAt:asc`}
        >
          {translate('HomePage.Table.Footer.Pagination.Previous')}
        </PreviousLink>
        {pages}
        <NextLink
          as={NavLink}
          to={`?page=${fetchParams.currentPage + 1}&pageSize=${
            fetchParams.viewsPerPage
          }&sortBy=createdAt:asc`}
        >
          {translate('HomePage.Table.Footer.Pagination.Next')}
        </NextLink>
      </Pagination>
    </Flex>
  );
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
      <TableFooter />
    </>
  );
};

ViewsTable.propTypes = {
  views: PropTypes.array.isRequired,
  showActions: PropTypes.bool
};

export default ViewsTable;
