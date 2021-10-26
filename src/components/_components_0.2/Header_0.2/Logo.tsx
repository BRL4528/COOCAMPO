import React from 'react';
import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      latterSpacing="tight"
      w="64"
    >
      cooasgo
      <Text as="span" ml="1" color="green">
        .
      </Text>
    </Text>
  );
}