import { Box } from '@chakra-ui/react';
import Navbar from '../Navbar/index';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box 
        as="main" 
        flex="1" 
        marginTop="64px"
        px={4} 
        py={8}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 