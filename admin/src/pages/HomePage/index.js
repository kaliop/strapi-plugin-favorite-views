/*
 *
 * HomePage
 *
 */

import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

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

import { ViewsContext } from '../../hooks/views/ViewsContext';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const { userViews, sharedViews, showDeleteModal } = useContext(ViewsContext);

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
        <TabGroup>
          <Tabs>
            <Tab>
              {formatMessage({
                id: getTrad('Homepage.Tabs.MyViews')
              })}
            </Tab>
            <Tab>
              {formatMessage({
                id: getTrad('Homepage.Tabs.SharedViews')
              })}
            </Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              {userViews.length ? (
                <Box padding={8} background="neutral0">
                  <ViewsTable views={userViews} showActions={true} />
                </Box>
              ) : (
                <EmptyStateLayout
                  icon={<Illo />}
                  content={formatMessage({
                    id: getTrad('Homepage.MyViews.EmptyStateLayout.content')
                  })}
                />
              )}
            </TabPanel>
            <TabPanel>
              {sharedViews.length ? (
                <Box padding={8} background="neutral0">
                  <ViewsTable views={sharedViews} />
                </Box>
              ) : (
                <EmptyStateLayout
                  icon={<Illo />}
                  content={formatMessage({
                    id: getTrad('Homepage.SharedViews.EmptyStateLayout.content')
                  })}
                />
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ContentLayout>
      {showDeleteModal && <DeleteViewModal />}
    </Layout>
  );
};

export default HomePage;
