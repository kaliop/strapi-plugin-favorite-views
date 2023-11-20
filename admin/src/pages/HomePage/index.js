/*
 *
 * HomePage
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import { BaseHeaderLayout, ContentLayout, EmptyStateLayout, Layout } from '@strapi/design-system';

import Illo from '../../components/Illo';
import ViewsTable from '../../components/ViewsTable';
import DeleteViewModal from '../../components/DeleteViewModal';

import useViews from '../../hooks/views/useViews';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const { views, deleteView, showDeleteModal, setShowDeleteModal, viewToDelete, setViewToDelete } =
    useViews();

  return (
    <Layout>
      <BaseHeaderLayout
        title={formatMessage({
          id: getTrad('Homepage.BaseHeaderLayout.title')
        })}
        subtitle={formatMessage({
          id: getTrad('Homepage.BaseHeaderLayout.subtitle')
        })}
      />
      <ContentLayout>
        {!views.length ? (
          <EmptyStateLayout
            icon={<Illo />}
            content={formatMessage({
              id: getTrad('Homepage.EmptyStateLayout.content')
            })}
          />
        ) : (
          <ViewsTable
            views={views}
            setShowDeleteModal={setShowDeleteModal}
            setViewToDelete={setViewToDelete}
          />
        )}
      </ContentLayout>
      {showDeleteModal && (
        <DeleteViewModal
          setShowDeleteModal={setShowDeleteModal}
          viewToDelete={viewToDelete}
          onDeleteView={deleteView}
        />
      )}
    </Layout>
  );
};

export default HomePage;
