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
import { useCallback, useState, useEffect } from 'react';
import { api } from '../../../../services/api';
import { DrawerComponent } from '../index';

interface ObservationsFactor {
  id_factor: string;
  observations: string;
}
interface PropsDrawer {
  idFactor: string;
  isOpen: boolean;
  arrayObservationsFactor: ObservationsFactor[];
  onClose: () => void;
  handleSubmitObservationFactor: (description: Omit<string, 'id'>) => void;
}
interface DataFactor {
  name: string;
  description: string;
}

export function DrawerEvaluation({
  isOpen,
  onClose,
  idFactor,
  handleSubmitObservationFactor,
  arrayObservationsFactor,
}: PropsDrawer) {
  const [valueInput, setvalueInput] = useState('');
  const [dataFactor, setDataFactor] = useState<DataFactor>();

  useEffect(() => {
    if (idFactor !== '') {
      api.get(`/factors/show?id=${idFactor}`).then(response => {
        setDataFactor(response.data);
      });

      const factorFitred = arrayObservationsFactor.filter(item => {
        return item.id_factor === idFactor;
      });

      if (factorFitred.length > 0) {
        setvalueInput(factorFitred[0].observations);
      }
    }
  }, [arrayObservationsFactor, idFactor]);

  const handleSubmit = useCallback(() => {
    handleSubmitObservationFactor(valueInput);
    setvalueInput('');
  }, [handleSubmitObservationFactor, valueInput]);

  const handleInputChange = useCallback(e => {
    const inputValue = e.target.value;
    setvalueInput(inputValue);
  }, []);

  return (
    <DrawerComponent isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerHeader borderBottomWidth="1px">Adicionar observação</DrawerHeader>

      <DrawerBody>
        <Stack spacing="24px" mt="10">
          <Center>
            <Flex direction="column" align="center">
              <Tag size="lg" colorScheme="yellow">
                {dataFactor?.name}
              </Tag>
              <Text color="gray.400" mt="5">
                {dataFactor?.description}
              </Text>
            </Flex>
          </Center>

          <Box>
            <FormLabel htmlFor="desc">Descrição</FormLabel>
            <Textarea
              id="desc"
              value={valueInput}
              onChange={handleInputChange}
              placeholder="Descrava suas observações"
              size="md"
              rows={15}
              resize="vertical"
            />
          </Box>
        </Stack>
      </DrawerBody>

      <DrawerFooter borderTopWidth="1px">
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
