import { extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
      variants: {
        outline: (props: any) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
            color: props.colorMode === 'dark' ? 'white' : 'gray.800',
            _placeholder: {
              color: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
            },
          },
        }),
      },
    },
  },
});

export { theme }; 