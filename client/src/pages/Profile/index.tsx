import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Avatar,
  useToast,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import api from '../../services/api';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const toast = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/auth/me');
        return data;
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch profile',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        throw error;
      }
    },
    retry: false
  });

  return (
    <Container maxW="container.xl" py={8}>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Stack spacing={8}>
          <Box textAlign="center">
            <Avatar size="2xl" name={user?.username} mb={4} />
            <Heading size="lg">{user?.username}</Heading>
            <Text color="gray.500">{profile?.email}</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading size="md" mb={4}>
                Player Stats
              </Heading>
              <Stack spacing={3}>
                <Text>Rank: {profile?.rank}</Text>
                <Text>Main Role: {profile?.mainRole}</Text>
                {/* Add more stats */}
              </Stack>
            </Box>

            <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading size="md" mb={4}>
                Teams
              </Heading>
              {/* Add team list */}
            </Box>
          </SimpleGrid>
        </Stack>
      )}
    </Container>
  );
};

export default Profile; 