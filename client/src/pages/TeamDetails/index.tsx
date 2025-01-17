import { 
  Container, 
  Heading, 
  Stack, 
  Text, 
  useToast, 
  Spinner,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  HStack,
  Avatar
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

interface TeamMember {
  _id: string;
  username: string;
  mainRole?: string;
  rank?: string;
}

interface Team {
  _id: string;
  name: string;
  leader: TeamMember;
  members: TeamMember[];
  rankRequirement: string;
  description: string;
}

const TeamDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const { data: team, isLoading } = useQuery<Team>({
    queryKey: ['team', id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/teams/${id}`);
        return data;
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.response?.data?.error || 'Failed to fetch team details',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        throw error;
      }
    },
    retry: false,
    enabled: !!id
  });

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Container maxW="container.lg" py={8}>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Stack spacing={8}>
          <Box>
            <Heading size="xl" mb={2}>{team?.name}</Heading>
            <Badge colorScheme="purple" fontSize="md" mb={4}>
              {team?.rankRequirement} Required
            </Badge>
            <Text fontSize="lg" color="gray.500">{team?.description}</Text>
          </Box>

          <Box>
            <Heading size="md" mb={4}>Team Members</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Member</Th>
                  <Th>Role</Th>
                  <Th>Rank</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {team?.members.map((member) => (
                  <Tr key={member._id}>
                    <Td>
                      <HStack>
                        <Avatar size="sm" name={member.username} />
                        <Text>{member.username}</Text>
                        {team.leader._id === member._id && (
                          <Badge colorScheme="green">Leader</Badge>
                        )}
                      </HStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="blue">
                        {member.mainRole || 'Not Set'}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme="purple">
                        {member.rank || 'Not Set'}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme="green">Active</Badge>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewProfile(member._id)}
                      >
                        View Profile
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default TeamDetails; 