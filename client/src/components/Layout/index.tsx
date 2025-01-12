import { Box } from '@chakra-ui/react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" as="main" py={8} px={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 