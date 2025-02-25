import { FC } from 'react';
import { Grid } from '@chakra-ui/react';
import { useIncomingUsers } from 'hooks/api';
import { AcceptAndRejectButton } from 'components/molecules/AcceptAndRejectButton';
import { UserCard } from 'features/friends/components/molecules/UserCard';

export const PendingList: FC = () => {
  const { users } = useIncomingUsers();

  if (users === undefined) return <></>;

  return (
    <Grid
      templateColumns={{
        md: 'repeat(1, 1fr)',
        lg: 'repeat(2, 1fr)',
      }}
      gap={6}
      data-test="users-pending-grid"
    >
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.name}
          nickname={user.nickname}
          avatarImageUrl={user.avatarImageUrl}
          buttons={<AcceptAndRejectButton targetId={user.id} />}
          isFriend={false}
        />
      ))}
    </Grid>
  );
};
