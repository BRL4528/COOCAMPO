import React from 'react';

import { Flex, Input, Icon, Box, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  return (
    <Tooltip
      hasArrow
      label="Pesquise por meio da ferramenta de normas e manuais"
    >
      <Box as={Link} to="/rules" cursor="pointer">
        <Flex
          as="label"
          flex="1"
          py="4"
          px="8"
          ml="6"
          maxWidth={400}
          alignSelf="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius="full"
          borderColor="red"
          cursor="pointer"
        >
          <Input
            cursor="pointer"
            color="gray.50"
            variant="unstyled"
            px="4"
            mar="4"
            placeholder="Busca na plataforma"
            _placeholder={{ color: 'gray.400' }}
          />
          <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
      </Box>
    </Tooltip>
  );
}
