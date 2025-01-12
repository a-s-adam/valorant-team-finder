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

const FindTeam = () => {
  const [rankFilter, setRankFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const toast = useToast();

  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams', rankFilter, roleFilter],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (rankFilter) params.append('rank', rankFilter);
        if (roleFilter) params.append('role', roleFilter);
        const { data } = await api.get(`/teams?${params.toString()}`);
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
            {teams?.map((team: any) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};

export default FindTeam; 