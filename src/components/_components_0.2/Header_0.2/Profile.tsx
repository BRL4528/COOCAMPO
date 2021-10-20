/* eslint-disable react/require-default-props */
import React from 'react';
import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

import { useAuth } from '../../../hooks/auth';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Bruno Luiz" />
    </Flex>
  );
}
