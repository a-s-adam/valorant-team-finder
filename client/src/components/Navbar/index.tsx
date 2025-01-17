import {
  Box,
  Flex,
  Button,
  Container,
  HStack,
  useColorMode,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Button
      as={RouterLink}
      to={to}
      variant="ghost"
      className={`nav-link ${isActive(to) ? 'active' : ''}`}
      position="relative"
      px={4}
      py={2}
      fontSize="md"
      fontWeight="500"
      color={colorMode === 'dark' ? 'white' : 'gray.700'}
      _hover={{
        bg: 'transparent',
        color: colorMode === 'dark' ? 'brand.200' : 'brand.500',
      }}
      _active={{
        bg: 'transparent',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isActive(to) ? '100%' : '0',
        height: '2px',
        bg: colorMode === 'dark' ? 'brand.200' : 'brand.500',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box 
      py={4} 
      sx={{
        position: 'fixed !important',
        top: '0 !important',
        zIndex: '9999 !important',
        width: '100%',
        backdropFilter: 'blur(10px)',
      }}
      borderBottom="1px" 
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      bg={colorMode === 'dark' ? '#141B24' : 'white'}
      position="fixed"
      top={0}
      left={0}
      right={0}
      width="100%"
      zIndex={9999}
      backdropFilter="blur(10px)"
      boxShadow="md"
    >
      <Container maxW="container.xl">
        <Flex position="relative" align="center" height="40px">
          <Box position="absolute" left={0} fontWeight="bold" fontSize="xl">
            VTF
          </Box>

          <Center flex="1">
            <HStack spacing={8}>
              <NavButton to="/">Home</NavButton>
              <NavButton to="/find-team">Find Team</NavButton>
              <NavButton to="/profile">Profile</NavButton>
            </HStack>
          </Center>

          <Box position="absolute" right={0}>
            <HStack spacing={4}>
              <IconButton
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
                variant="ghost"
                _hover={{
                  bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
                }}
              />
              
              {user ? (
                <Menu>
                  <MenuButton>
                    <Avatar 
                      size="sm" 
                      name={user.username}
                      cursor="pointer"
                      _hover={{ 
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={RouterLink} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button 
                  as={RouterLink} 
                  to="/login" 
                  colorScheme="brand"
                  size="sm"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s ease"
                >
                  Sign In
                </Button>
              )}
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 