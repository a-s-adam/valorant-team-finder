import {
  Container,
  Heading,
  SimpleGrid,
  Select,
  Stack,
  Input,
  Button,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import TeamCard from '../../components/TeamCard';

interface Team {
  _id: string;
  name: string;
  leader: {
    _id: string;
    username: string;
  };
  members: Array<{
    _id: string;
    username: string;
  }>;
  rankRequirement: string;
  description: string;
}

const FindTeam = () => {
  const [rankFilter, setRankFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const toast = useToast();

  const { data: teams, isLoading } = useQuery<Team[]>({
    queryKey: ['teams', rankFilter, roleFilter],
    queryFn: async () => {
      try {
        const { data } = await api.get('/teams');
        return data;
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch teams',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        throw error;
      }
    },
    retry: false
  });

  const ranks = [
    'Iron',
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Ascendant',
    'Immortal',
    'Radiant'
  ];

  const roles = ['Duelist', 'Initiator', 'Controller', 'Sentinel'];

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading>Find a Team</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Select
            placeholder="Filter by rank"
            value={rankFilter}
            onChange={(e) => setRankFilter(e.target.value)}
          >
            {ranks.map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </Select>
          <Select
            placeholder="Filter by role needed"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Select>
          <Input placeholder="Search teams..." />
          <Button colorScheme="brand">Search</Button>
        </Stack>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {teams?.map((team: Team) => (
              <TeamCard 
                key={team._id}
                team={{
                  id: team._id,
                  name: team.name,
                  rankRequirement: team.rankRequirement,
                  description: team.description,
                  members: team.members.map(m => m._id)
                }} 
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default FindTeam; 