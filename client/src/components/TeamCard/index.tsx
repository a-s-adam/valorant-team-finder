import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    rankRequirement: string;
    description: string;
    members: string[];
  };
}

const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const joinTeamMutation = useMutation({
    mutationFn: async (teamId: string) => {
      const response = await api.post(`/teams/${teamId}/join`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast({
        title: 'Success',
        description: 'Successfully joined team',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to join team',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
      <Stack spacing={3}>
        <Heading size="md">{team.name}</Heading>
        <Badge colorScheme="purple" alignSelf="start">
          {team.rankRequirement}
        </Badge>
        <Text noOfLines={2}>{team.description}</Text>
        <Text color="gray.500">
          Members: {team.members.length}
        </Text>
        <Stack direction="row" spacing={4} pt={2}>
          <Button
            onClick={() => navigate(`/teams/${team.id}`)}
            variant="outline"
            size="sm"
          >
            View Details
          </Button>
          <Button
            onClick={() => joinTeamMutation.mutate(team.id)}
            colorScheme="brand"
            size="sm"
            isLoading={joinTeamMutation.isPending}
          >
            Join Team
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TeamCard; 