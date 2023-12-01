/*
 *
 * HomePage
 *
 */

import React, { useContext } from 'react';

import {
  BaseHeaderLayout,
  Box,
  ContentLayout,
  EmptyStateLayout,
  Layout,
  TabGroup,
  Tabs,
  Tab,
  TabPanels,
  TabPanel
} from '@strapi/design-system';

import Illo from '../../components/Illo';
import ViewsTable from '../../components/ViewsTable';
import DeleteViewModal from '../../components/DeleteViewModal';
import UpdateViewModal from '../../components/UpdateViewModal';
import Notification from '../../components/Notification';

import useTranslate from '../../hooks/translations/useTranslate';
import { NotificationsContext } from '../../hooks/notifications/NotificationsContext';
import { ViewsContext } from '../../hooks/views/ViewsContext';

const HomePage = () => {
  const { translate } = useTranslate();

  const { privateViews, userViews, sharedViews, showUpdateModal, showDeleteModal } =
    useContext(ViewsContext);
  const { notification } = useContext(NotificationsContext);

  return (
    <Layout>
      <BaseHeaderLayout
        title={translate('Homepage.BaseHeaderLayout.title')}
        subtitle={translate('Homepage.BaseHeaderLayout.subtitle')}
      />
      <ContentLayout>
        <TabGroup>
          <Tabs>
            <Tab>{translate('Homepage.Tabs.MyViews')}</Tab>
            <Tab>{translate('Homepage.Tabs.SharedViews')}</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              {userViews.length || privateViews.length ? (
                <Box padding={8} background="neutral0">
                  <ViewsTable views={[...privateViews, ...userViews]} showActions={true} />
                </Box>
              ) : (
                <EmptyStateLayout
                  icon={<Illo />}
                  content={translate('Homepage.MyViews.EmptyStateLayout.content')}
                />
              )}
            </TabPanel>
            <TabPanel>
              {sharedViews.length ? (
                <Box padding={8} background="neutral0">
                  <ViewsTable views={sharedViews} showActions={false} />
                </Box>
              ) : (
                <EmptyStateLayout
                  icon={<Illo />}
                  content={translate('Homepage.SharedViews.EmptyStateLayout.content')}
                />
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ContentLayout>
      {showDeleteModal && <DeleteViewModal />}
      {showUpdateModal && <UpdateViewModal />}
      {notification && <Notification notification={notification} />}
    </Layout>
  );
};

export default HomePage;
