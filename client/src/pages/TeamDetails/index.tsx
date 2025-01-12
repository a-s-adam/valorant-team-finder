import { Container, Heading, Stack, Text, useToast, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const TeamDetails = () => {
  const { id } = useParams();
  const toast = useToast();

  const { data: team, isLoading } = useQuery({
    queryKey: ['team', id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/teams/${id}`);
        return data;
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch team details',
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
    <Container maxW="container.lg" py={8}>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Stack spacing={6}>
          <Heading>{team?.name}</Heading>
          <Text>{team?.description}</Text>
        </Stack>
      )}
    </Container>
  );
};

export default TeamDetails; 