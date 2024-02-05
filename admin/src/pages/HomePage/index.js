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

import useTranslate from '../../hooks/translations/useTranslate';
import { ViewsContext } from '../../hooks/views/ViewsContext';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const { translate } = useTranslate();

  const { views, showUpdateModal, setTabsIndex, setItemsPerPage } = useContext(ViewsContext);
  const history = useHistory();

  return (
    <Layout>
      <BaseHeaderLayout
        title={translate('Homepage.BaseHeaderLayout.title')}
        subtitle={translate('Homepage.BaseHeaderLayout.subtitle')}
      />
      <ContentLayout>
        <TabGroup
          onTabChange={(index) => {
            history.push(`?page=1&pageSize=10&sortBy=createdAt:asc`);
            setItemsPerPage(10);
            setTabsIndex(index);
          }}
        >
          <Tabs>
            <Tab>{translate('Homepage.Tabs.MyViews')}</Tab>
            <Tab>{translate('Homepage.Tabs.SharedViews')}</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              {views.length ? (
                <Box padding={8} background="neutral0">
                  <ViewsTable views={views} showActions={true} />
                </Box>
              ) : (
                <EmptyStateLayout
                  icon={<Illo />}
                  content={translate('Homepage.MyViews.EmptyStateLayout.content')}
                />
              )}
            </TabPanel>
            <TabPanel>
              {views.length ? (
                <Box padding={8} background="neutral0">
                  <ViewsTable views={views} showActions={false} />
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
      <DeleteViewModal />
      {showUpdateModal && <UpdateViewModal />}
    </Layout>
  );
};

export default HomePage;
