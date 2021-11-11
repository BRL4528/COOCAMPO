import { useLocation } from 'react-router-dom';

import React, { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';

interface ActiveLinkProps {
  children: ReactElement;
  toHref: string;
}

export function ActiveLink({ children, toHref }: ActiveLinkProps) {
  const { pathname } = useLocation();

  let isActive = false;

  if (pathname === toHref) {
    isActive = true;
  }

  return <Box color={isActive ? 'blue.500' : 'gray.50'}>{children}</Box>;
}
