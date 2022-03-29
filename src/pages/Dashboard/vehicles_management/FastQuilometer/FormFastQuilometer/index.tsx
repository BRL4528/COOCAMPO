import {
  Box,
  Center,
  Button,
  Container,
  Heading,
  Stack,
  useBreakpointValue,
  Link,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';

export default function FormFastQuilometer() {
  return (
    <Center h="100vh" as="section" bg="bg-surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack spacing={{ base: '4', md: '5' }} align="center">
            <Box>{/* <Image src={emoji} fontSize="20" /> */}</Box>
            <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
              A quilometragem inicial foi?
            </Heading>
            {/* <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
              certifique o veiculo para que possamos prosseguir
            </Text> */}
          </Stack>
          <Stack>
            <Editable
              fontSize={useBreakpointValue({ base: '20', md: '25' })}
              defaultValue="13.265"
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Stack>
          <Stack spacing="3" direction="column" justify="center">
            <Button as={Link} to="/" colorScheme="green" size="lg">
              Continuar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}
