import React from 'react';
import { Collapse, Box } from '@chakra-ui/react';

interface IPropsFilter {
  isOpen: boolean;
  children: React.ReactChild;
}

export function FilterCollapse({ isOpen, children }: IPropsFilter) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Box>{children}</Box>
    </Collapse>
  );
}
