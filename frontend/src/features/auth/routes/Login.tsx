import { memo, FC, useState } from 'react';
import { Box, Divider, Flex, Heading, Select, Stack } from '@chakra-ui/react';
import { Auth42Button } from '../components/Auth42Button';
import { DummyAuthButton } from '../components/DummyAuthButton';

export const Login: FC = memo(() => {
  const [dummyUserId, setDummyUserId] = useState('1');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDummyUserId(e.target.value);
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          TransPong
        </Heading>
        <Divider />
        <Stack spacing={4} py={4} px={10}>
          <Auth42Button />
          <Divider />
          <Select onChange={onChange}>
            {[...Array<number>(99)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                dummy{i + 1}
              </option>
            ))}
          </Select>
          <DummyAuthButton
            dummyId={'dummy' + ('000' + dummyUserId).slice(-3)}
          />
        </Stack>
      </Box>
    </Flex>
  );
});
