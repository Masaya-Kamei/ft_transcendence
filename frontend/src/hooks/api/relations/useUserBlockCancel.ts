import { Block } from '@prisma/client';
import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axios } from 'lib/axios';

export interface UserBlockCancelResBody {
  block: Block;
}

export type CancelUserBlock = UseMutateAsyncFunction<
  UserBlockCancelResBody,
  unknown,
  string,
  unknown
>;

export const useUserBlockCancel = (): {
  cancelUserBlock: CancelUserBlock;
  isLoading: boolean;
} => {
  const axiosDelete = async (userId: string) => {
    const result = await axios.delete<UserBlockCancelResBody>(
      `/users/me/blocks/${userId}`
    );

    return result.data;
  };

  const queryClient = useQueryClient();

  const { mutateAsync: cancelUserBlock, isLoading } = useMutation(axiosDelete, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['/users/me/blocks']);
    },
  });

  return { cancelUserBlock, isLoading };
};
