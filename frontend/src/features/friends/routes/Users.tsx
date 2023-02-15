import { memo, FC, Suspense } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { CenterSpinner } from 'components/atoms/spinner/CenterSpinner';
import { ContentLayout } from 'components/ecosystems/ContentLayout';
import { BlockedList } from 'features/friends/components/organisms/BlockedList';
import { FriendsList } from 'features/friends/components/organisms/FriendsList';
import { PendingList } from 'features/friends/components/organisms/PendingList';
import { RequestableUsersList } from 'features/friends/components/organisms/RequestableUsersList';
import { RequestingList } from 'features/friends/components/organisms/RequestingList';

const tabs = [
  'Friends',
  'Requesting',
  'Pending',
  'MessageBlocked',
  'AddFriend',
];
const dataTestList = [
  'users-friends-tab',
  'users-requesting-tab',
  'users-pending-tab',
  'users-blocked-tab',
  'users-add-friend-tab',
];

export const Users: FC = memo(() => {
  return (
    <ContentLayout title="Users">
      <Tabs variant="soft-rounded" colorScheme="gray">
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={tab} data-test={dataTestList[index]}>
              {tab}
            </Tab>
          ))}
        </TabList>
        <Suspense fallback={<CenterSpinner h="80vh" />}>
          <TabPanels>
            <TabPanel>
              <FriendsList />
            </TabPanel>
            <TabPanel>
              <RequestingList />
            </TabPanel>
            <TabPanel>
              <PendingList />
            </TabPanel>
            <TabPanel>
              <BlockedList />
            </TabPanel>
            <TabPanel>
              <RequestableUsersList />
            </TabPanel>
          </TabPanels>
        </Suspense>
      </Tabs>
    </ContentLayout>
  );
});
