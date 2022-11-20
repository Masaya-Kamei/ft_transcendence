import { FC, memo } from 'react';
// import { FC, memo, useEffect } from 'react';
import { Avatar } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { Link } from 'react-router-dom';
import { PrimaryTable } from 'components/atoms/table/PrimaryTable';
import { useAllFriends } from '../hooks/useAllFriends';
// import { useAllUsers } from '../hooks/useAllUsers';
import { AddFriend } from './AddFriend';
import { DirectMessageButton } from './DirectMessageButton';

export const UsersList: FC = memo(() => {
  // const { getUsers, users } = useAllUsers();

  // useEffect(() => getUsers(), [getUsers]);
  const data = useAllFriends();

  if (data === undefined) return <></>;

  return (
    <PrimaryTable<User>
      data={data}
      // data={users}
      columns={[
        {
          title: '',
          Cell({ entry: { avatarUrl } }) {
            return <Avatar size="md" src={avatarUrl} />;
          },
        },
        {
          title: '',
          Cell({ entry: { name } }) {
            return <Link to={`../${name}`}>{name}</Link>;
          },
        },
        {
          title: '',
          Cell({ entry: { name } }) {
            return <DirectMessageButton id={name} />;
          },
        },
        {
          title: '',
          Cell({ entry: { name } }) {
            return <AddFriend id={name} />;
          },
        },
      ]}
    />
  );
});
