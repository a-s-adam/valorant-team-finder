import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import { store } from './store';
import AppRoutes from './routes';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <Layout>
                <AppRoutes />
              </Layout>
            </BrowserRouter>
          </ChakraProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App; 