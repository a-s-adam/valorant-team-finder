import { Box, Container, HStack, Text, Button } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={8}>
      <Container maxW="container.lg">
        <HStack
          flexDir={{ base: 'column', md: 'row' }}
          gap={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>© 2024 Valorant Team Finder. All rights reserved</Text>
          <HStack gap={4}>
            <Button
              onClick={() => window.open('https://github.com/a-s-adam/valorant-team-finder', '_blank')}
              leftIcon={<FaGithub />}
              variant="ghost"
              color="white"
              size="sm"
            >
              GitHub
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer; 