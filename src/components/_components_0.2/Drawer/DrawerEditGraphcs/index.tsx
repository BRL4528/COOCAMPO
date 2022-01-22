/* eslint-disable @typescript-eslint/no-empty-function */
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
  Box,
  FormLabel,
  Textarea,
  Button,
  Tag,
  Center,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { DrawerComponent } from '../index';

interface PropsDrawer {
  isOpen: boolean;

  onClose: () => void;
}

export function DrawerEditGraphcs({ isOpen, onClose }: PropsDrawer) {
  const [valueInput, setvalueInput] = useState('');

  const handleSubmit = useCallback(() => {
    console.log(valueInput);
    setvalueInput('');
  }, [valueInput]);

  const handleInputChange = useCallback(e => {
    const inputValue = e.target.value;
    setvalueInput(inputValue);
  }, []);

  return (
    <DrawerComponent isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerHeader>Editar parametros do gráfico</DrawerHeader>

      <DrawerBody>
        <Stack spacing="24px" mt="10">
          <Center>
            <Flex direction="column" align="center">
              <Tag size="lg" colorScheme="yellow">
                Taxa de utilização
              </Tag>
              <Text color="gray.400" mt="5">
                teste
              </Text>
            </Flex>
          </Center>

          <Box>
            <FormLabel htmlFor="desc">Descrição</FormLabel>
            <Textarea
              id="desc"
              placeholder="Descrava suas observações"
              size="md"
              rows={2}
              resize="vertical"
            />
          </Box>
        </Stack>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={() => {}}>
          Cancelar
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Salvar
        </Button>
      </DrawerFooter>
    </DrawerComponent>
  );
}
