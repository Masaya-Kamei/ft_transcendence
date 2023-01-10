import { ChatRoomStatus } from '@prisma/client';
import * as ReactQuery from '@tanstack/react-query';
import { usePatchApi } from 'hooks/api/generics/usePatchApi';
import { useNavigate } from 'react-router-dom';

export const useChatRoomProtectSetting = (
  chatRoomId: string
): {
  changeChatRoomStatusProtect: (data: { password: string }) => Promise<void>;
  changeChatRoomStatusPublic: () => Promise<void>;
  changeChatRoomStatusPrivate: () => Promise<void>;
} => {
  const navigate = useNavigate();
  const endpoint = `/chat/rooms/${chatRoomId}`;
  const url = `/app/chat/rooms/${chatRoomId}`;
  const queryKeys: ReactQuery.QueryKey[] = [['/chat/rooms']];
  const { mutateAsync, isSuccess } = usePatchApi<
    {
      roomStatus: ChatRoomStatus;
      password: string | undefined;
    },
    Promise<void>
  >(endpoint, queryKeys);

  const changeChatRoomStatusProtect = async (data: { password: string }) => {
    await mutateAsync({
      roomStatus: ChatRoomStatus.PROTECTED,
      password: data.password,
    });
    if (isSuccess) {
      navigate(url);
    }
  };

  const changeChatRoomStatusPublic = async () => {
    await mutateAsync({
      roomStatus: ChatRoomStatus.PUBLIC,
      password: undefined,
    });
    if (isSuccess) {
      navigate(url);
    }
  };

  const changeChatRoomStatusPrivate = async () => {
    await mutateAsync({
      roomStatus: ChatRoomStatus.PRIVATE,
      password: undefined,
    });
    if (isSuccess) {
      navigate(url);
    }
  };

  return {
    changeChatRoomStatusProtect,
    changeChatRoomStatusPublic,
    changeChatRoomStatusPrivate,
  };
};
