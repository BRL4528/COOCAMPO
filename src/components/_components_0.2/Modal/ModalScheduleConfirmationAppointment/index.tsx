import { Flex, Box, Badge, Text, ModalFooter, Button } from '@chakra-ui/react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useRef, useCallback, useState } from 'react';
import { ModalComponent } from '..';
import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Select from '../../../Global/SelectRelease';
import getValidationErrors from '../../../../utils/getValidationErrors';

interface DestinyInfos {
  destiny: string;
  description: string;
  leader: string;
}

interface IpropsModal {
  formateDateStartAppointments: string;
  formateDateEndAppointments: string;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleSubmitScheduleVehicle: (data: DestinyInfos) => void;
}

const options = [
  {
    label: 'Ivonei Scotton',
    value: 'Ivonei Scotton',
  },
  {
    label: 'Cristiano Mattei',
    value: 'Cristiano Mattei',
  },
  {
    label: 'Marcos Angelo Piaia',
    value: 'Marcos Angelo Piaia',
  },
  {
    label: 'Cesário Teixeira Pereira',
    value: 'Cesário Teixeira Pereira',
  },
];

export function ModalScheduleConfirmationAppointment({
  handleSubmitScheduleVehicle,
  formateDateStartAppointments,
  formateDateEndAppointments,
  isOpen,
  onClose,
  loading,
}: IpropsModal) {
  const formRef = useRef<FormHandles>(null);
  const [reasonItem, setReason] = useState('');

  const handleSubmit = useCallback(
    async (data: DestinyInfos) => {
      try {
        // setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          destiny: Yup.string().required('Destino é obrigatório'),
          description: Yup.string().required('Descrição é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { description, destiny } = data;
        const formateData = {
          description,
          destiny,
          leader: reasonItem,
        };
        handleSubmitScheduleVehicle(formateData);
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleSubmitScheduleVehicle, reasonItem],
  );
  const handleReason = useCallback(e => {
    setReason(e);
  }, []);
  return (
    <ModalComponent
      title="Confirmar solicitação de agendamento"
      onClose={onClose}
      isOpen={isOpen}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Flex direction="column" p="25">
          <Box>
            <Badge colorScheme="green">Saindo</Badge>
            <Text>{formateDateStartAppointments} </Text>
          </Box>

          <Box mt="5">
            <Badge colorScheme="red">Retornando</Badge>
            <Text>{formateDateEndAppointments} </Text>
          </Box>

          <Flex
            // border="1px"
            // borderColor="green"
            bg="gray.800"
            direction="column"
            p="15px"
            mt="5"
            borderRadius="6"
          >
            <Text fontSize="15" fontWeight="600">
              Destino
            </Text>
            <Input name="destiny" type="text" placeholder="Campo Grande" />

            <Box>
              <Text fontSize="15" fontWeight="600" mt="2">
                Descrição
              </Text>

              <TextArea
                name="description"
                placeholder="Levar veiculo para revisão manutençao preventiva de 10.000 km"
              />
            </Box>

            <Box>
              <Text fontSize="15" fontWeight="600" mt="2">
                Selecione um autorizador
              </Text>

              <Select
                name="authorizing"
                onChange={e => {
                  handleReason(e.target.value);
                }}
                label=""
                options={options}
              />
            </Box>
          </Flex>
        </Flex>
        <ModalFooter>
          <Button
            onClick={onClose}
            isLoading={loading}
            colorScheme="gray"
            mr={3}
          >
            Cancelar
          </Button>
          <Button colorScheme="blue" isLoading={loading} type="submit">
            Confirmar
          </Button>
        </ModalFooter>
      </Form>
    </ModalComponent>
  );
}
