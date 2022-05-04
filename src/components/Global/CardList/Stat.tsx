import {
  Box,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

interface Props {
  label: string;
  value: string;
}
export const Stat = (props: Props) => {
  const { label, value, ...boxProps } = props;
  return (
    <Box
      px={{ base: '4', md: '8' }}
      py={{ base: '5', md: '8' }}
      bg="#fff"
      borderRadius="27px"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      {...boxProps}
    >
      <Stack>
        <Text fontSize="sm" color="muted">
          {label}
        </Text>
        <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
          {value}
        </Heading>
      </Stack>
    </Box>
  );
};
