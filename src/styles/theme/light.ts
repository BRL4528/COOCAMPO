import { extendTheme } from '@chakra-ui/react';

export const light = extendTheme({
  colors: {
    gray: {
      '50': '#181B23',
      '100': '#1F2029',
      '200': '#353646',
      '300': '#4B4D63',
      '400': '#616480',
      '500': '#797D9A',
      '600': '#333',
      '650': '#adb5bd',
      '700': '#EEEEF2',
      '900': '#EEEEF2',
      '800': '#FEFEFE',
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
          fontSize: '24px',
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
