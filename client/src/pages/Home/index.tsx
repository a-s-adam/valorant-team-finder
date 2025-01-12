import { Box, Container, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxW="container.xl">
      <Box textAlign="center" py={20}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight="110%"
        >
          Find your perfect{' '}
          <Text as="span" color="brand.500">
            Valorant team
          </Text>
        </Heading>
        <Text color="gray.500" maxW="3xl" mx="auto" mt={6} fontSize="xl">
          Connect with players, form teams, and climb the ranks together. Join the
          community of competitive Valorant players today.
        </Text>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="center"
          mt={10}
        >
          <Button
            as={RouterLink}
            to="/register"
            colorScheme="brand"
            size="lg"
            px={8}
          >
            Get Started
          </Button>
          <Button
            as={RouterLink}
            to="/find-team"
            variant="outline"
            size="lg"
            px={8}
          >
            Find Teams
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home; 