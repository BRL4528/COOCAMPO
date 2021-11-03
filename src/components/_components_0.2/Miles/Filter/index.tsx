import { Collapse, Box } from '@chakra-ui/react';

interface IPropsFilter {
  isOpen: boolean;
}

export function FilterCollapse({ isOpen }: IPropsFilter) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Box
        p="40px"
        color="white"
        // mt="4"
        bg="gray.700"
        rounded="md"
        shadow="md"
      >
        Teste
      </Box>
    </Collapse>
  );
}
