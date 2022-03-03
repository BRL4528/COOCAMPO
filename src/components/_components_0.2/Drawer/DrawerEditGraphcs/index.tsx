/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useState, useRef, useEffect } from 'react';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
  FormLabel,
  Button,
  Tag,
  Center,
  Text,
  Flex,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Input from '../../../Global/Input';
import { DrawerComponent } from '../index';
import { apllyToast } from '../../../Global/Toast2.0';
import getValidationErrors from '../../../../utils/getValidationErrors';

interface DateGraphicState {
  date_start: string;
  date_end: string;
}
interface PropsDrawer {
  isOpen: boolean;
  graphicTitle: string;
  onClose: () => void;
  handleSendTypeGraphic: (type: string) => void;
  handleSendDataGraphic: (date: Omit<DateGraphicState, ''>) => void;
}

export function DrawerEditGraphcs({
  isOpen,
  onClose,
  graphicTitle,
  handleSendTypeGraphic,
  handleSendDataGraphic,
}: PropsDrawer) {
  const formRef = useRef<FormHandles>(null);
  const [typeGraphic, setTypeGraphic] = useState(() => {
    const type = localStorage.getItem(`@Samasc:type_graphic_${graphicTitle}`);
    if (type) {
      return type;
    }
    return '';
  });
  const [dateGraphic, setDateGraphic] = useState(() => {
    const date = localStorage.getItem(`@Samasc:date_graphic_${graphicTitle}`);
    if (date) {
      console.log(date);
    }
    return '';
  });

  useEffect(() => {
    const type = localStorage.getItem(`@Samasc:type_graphic_${graphicTitle}`);
    const date = localStorage.getItem(`@Samasc:date_graphic_${graphicTitle}`);
    try {
      if (type) {
        console.log(type);
        handleSendTypeGraphic(type);
      }
      if (date) {
        // handleSendDataGraphic(dateGraphic);
      }
    } catch (err) {
      console.log(err);
    }
  }, [
    dateGraphic,
    graphicTitle,
    handleSendDataGraphic,
    handleSendTypeGraphic,
    typeGraphic,
  ]);

  const handleSubmit = useCallback(
    async (data: DateGraphicState) => {
      try {
        localStorage.setItem(
          `@Samasc:type_graphic_${graphicTitle}`,
          typeGraphic,
        );
        apllyToast('success', 'Informações salvas com sucesso');
        handleSendTypeGraphic(typeGraphic);
        if (data.date_start && data.date_end) {
          handleSendDataGraphic(data);
          setDateGraphic(String(data));
          localStorage.setItem(`@Samasc:date_graphic_${data}`, typeGraphic);
        }
        onClose();
      } catch (err) {
        console.log(err);
        apllyToast('warning', 'Problemas ao atualizar informações');
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [
      graphicTitle,
      handleSendDataGraphic,
      handleSendTypeGraphic,
      onClose,
      typeGraphic,
    ],
  );

  // const handleInputChange = useCallback(e => {
  //   const inputValue = e.target.value;
  //   setvalueInput(inputValue);
  // }, []);

  return (
    <DrawerComponent isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerHeader>Editar parametros do gráfico</DrawerHeader>
      <DrawerBody>
        <Form onSubmit={handleSubmit}>
          <Stack spacing="24px" mt="10">
            <Center>
              <Flex direction="column" align="center">
                <Tag size="lg" colorScheme="blue">
                  {graphicTitle}
                </Tag>
                <Text color="gray.300" mt="8">
                  Editar informações do gráfico
                </Text>
              </Flex>
            </Center>

            <FormLabel htmlFor="date_initial">Data inicial</FormLabel>
            <Input type="date" mt={-4} name="date_start" />

            <FormLabel mt="3" htmlFor="date_initial">
              Data final
            </FormLabel>
            <Input type="date" mt={-4} name="date_end" />

            <Center>
              <Flex direction="column" align="center">
                <Text color="gray.300" mt="8">
                  Editar configurações do gráfico
                </Text>
              </Flex>
            </Center>

            <FormLabel htmlFor="type">Tipo do gráfico</FormLabel>
            <RadioGroup
              onChange={setTypeGraphic}
              value={typeGraphic}
              name="type"
            >
              <Stack direction="column">
                <Radio value={`area-${graphicTitle}`}>Área</Radio>
                <Radio value={`bar-${graphicTitle}`}>Barra</Radio>
                <Radio value={`line-${graphicTitle}`}>linha</Radio>
                <Radio value={`pie-${graphicTitle}`}>Torta</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" type="submit">
              Salvar
            </Button>
          </DrawerFooter>
        </Form>
      </DrawerBody>
    </DrawerComponent>
  );
}
