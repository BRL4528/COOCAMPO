import {
  Box,
  Image,
  Center,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import emoji from '../../../../assets/emoji.svg';

export default function FastQuilometer() {
  return (
    <Center h="100vh" as="section" bg="bg-surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack spacing={{ base: '4', md: '5' }} align="center">
            <Box>
              <Image src={emoji} fontSize="20" />
            </Box>
            <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
              Qual veiculo vc esta utilizando?
            </Heading>
            <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
              certifique o veiculo para que possamos prosseguir
            </Text>
          </Stack>
          <Stack spacing="3" direction="column" justify="center">
            <Button colorScheme="blue" size="lg">
              outro veiculo
            </Button>
            <Button
              as={Link}
              to="/miles/formFastQuilometer"
              colorScheme="green"
              size="lg"
            >
              Estou utilizando o Fiat Cronos
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}
