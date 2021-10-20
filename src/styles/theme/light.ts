import { extendTheme } from '@chakra-ui/react';

export const light = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
    white: {
      '100': '#F8F8FB',
      '50': '#fff',
    },
    yellow: {
      '500': '#f2c811',
    },
  },

  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },

  styles: {
    global: {
      body: {
        bg: 'white.100',
        color: 'gray.600',
        transition: '1s',
        webkitFontSmoothing: 'antialiased',
        h1: {
          fontWeight: '500',
        },
        h2: {
          fontWeight: '500',
        },
        h3: {
          fontWeight: '500',
        },
        h4: {
          fontWeight: '500',
        },
        h5: {
          fontWeight: '500',
        },
        h6: {
          fontWeight: '500',
        },
        strong: {
          fontWeight: '500',
        },
        select: {
          fontWeight: '500',
        },
      },
    },
  },
});
