import {
  RadioGroup,
  Center,
  Radio,
  SimpleGrid,
  Text,
  Button,
} from '@chakra-ui/react';

export function FloatlistHours() {
  return (
    <Center flexDirection="column" mt="8">
      <Text fontSize={['md', 'lg', 'xl']}>
        Selecione um horario disponivel para agendar este veiculo
      </Text>
      <RadioGroup>
        <SimpleGrid
          // minChildWidth="100%"
          columns={[3, null, 5]}
          spacing={2}
          mt={4}
          bg="re"
        >
          <Radio p={['2', '4']} value="1" bg="gray.700" borderRadius={8} m="2">
            9:00 AM - 9:15 AM
          </Radio>

          <Radio p={['2', '4']} value="2" bg="gray.700" borderRadius={8} m="2">
            9:15 AM - 9:30 AM
          </Radio>

          <Radio p={['2', '4']} value="3" bg="gray.700" borderRadius={8} m="2">
            9:30 AM - 9:45 AM
          </Radio>

          <Radio p={['2', '4']} value="4" bg="gray.700" borderRadius={8} m="2">
            10:00 AM - 10:15 AM
          </Radio>

          <Radio p={['2', '4']} value="5" bg="gray.700" borderRadius={8} m="2">
            10:15 AM - 10:30 AM
          </Radio>

          <Radio p={['2', '4']} value="6" bg="gray.700" borderRadius={8} m="2">
            10:30 AM - 10:45 AM
          </Radio>

          <Radio p={['2', '4']} value="7" bg="gray.700" borderRadius={8} m="2">
            11:00 AM - 11:15 AM
          </Radio>
        </SimpleGrid>
      </RadioGroup>

      <Button bg="blue.500">Agendar veiculo</Button>
    </Center>
  );
}
