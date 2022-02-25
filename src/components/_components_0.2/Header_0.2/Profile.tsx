/* eslint-disable react/require-default-props */
import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';

interface ProfileProps {
  showProfileData?: boolean;
  path: string;
}

export function Profile({ showProfileData = true, path }: ProfileProps) {
  const { user } = useAuth();

  return (
    <Link to="/profile">
      <Flex align="center">
        {showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>{user.name}</Text>
            <Text color="gray.300" fontSize="small">
              {user.email}
            </Text>
          </Box>
        )}

        {path === 'profile' ? '' : <Avatar size="md" name={user.name} />}
      </Flex>
    </Link>
  );
}
