import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#ffe5e5',
      100: '#fbb8b8',
      200: '#f48a8a',
      300: '#ed5c5c',
      400: '#e62e2e',
      500: '#cc1515',
      600: '#a00f0f',
      700: '#730a0a',
      800: '#460505',
      900: '#1d0000',
    },
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0A0F16' : 'gray.50',
        color: props.colorMode === 'dark' ? '#EDF2F7' : 'gray.800',
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
      },
    },
    Card: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
        bg: props.colorMode === 'dark' ? '#1A202C' : 'white',
        borderRadius: 'lg',
        boxShadow: props.colorMode === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.4)' : 'lg',
        p: 6,
      }),
    },
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: (props: { colorMode: 'light' | 'dark' }) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.400',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.500',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        }),
        ghost: (props: { colorMode: 'light' | 'dark' }) => ({
          color: props.colorMode === 'dark' ? '#EDF2F7' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: (props: { colorMode: 'light' | 'dark' }) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#141B24' : 'white',
            borderColor: props.colorMode === 'dark' ? '#4A5568' : 'gray.200',
            color: props.colorMode === 'dark' ? '#EDF2F7' : 'gray.800',
            _hover: {
              borderColor: props.colorMode === 'dark' ? '#718096' : 'gray.300',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#CC1515' : '#E62E2E'}`,
            },
            _placeholder: {
              color: props.colorMode === 'dark' ? '#718096' : 'gray.500',
            },
          },
        }),
      },
    },
    Select: {
      variants: {
        outline: (props: { colorMode: 'light' | 'dark' }) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#141B24' : 'white',
            borderColor: props.colorMode === 'dark' ? '#4A5568' : 'gray.200',
            color: props.colorMode === 'dark' ? '#EDF2F7' : 'gray.800',
            _hover: {
              borderColor: props.colorMode === 'dark' ? '#718096' : 'gray.300',
            },
          },
        }),
      },
    },
    Heading: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
        color: props.colorMode === 'dark' ? '#EDF2F7' : 'gray.800',
        letterSpacing: 'tight',
      }),
    },
    Text: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
        color: props.colorMode === 'dark' ? '#A0AEC0' : 'gray.800',
        lineHeight: 'tall',
      }),
    },
    FormLabel: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
        color: props.colorMode === 'dark' ? '#A0AEC0' : 'gray.600',
        fontSize: 'sm',
        fontWeight: 'medium',
        mb: 2,
      }),
    },
    Box: {
      variants: {
        form: (props: { colorMode: 'light' | 'dark' }) => ({
          bg: props.colorMode === 'dark' ? '#141B24' : 'white',
          borderRadius: 'lg',
          boxShadow: props.colorMode === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.4)' : 'lg',
          p: 8,
        }),
        navbar: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }
      },
    },
  },
});

export { theme }; 