import React, { useCallback, useRef, useState } from 'react';
import {
  Text,
  Button,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
  ModalBody,
  ModalFooter,
  InputGroup,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { RiAddLine } from 'react-icons/ri';
import { useLoading, Oval } from '@agney/react-loading';
import { apllyToast } from '../../../Global/Toast2.0';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Select from '../../../Global/SelectRelease';
import { ModalComponent } from '..';

interface ISupply {
  date: string;
  type: string;
  quantity: number;
  amount_total: number;
  km_odometer: number;
  observation: string;
}

interface IModalProps {
  handleAddNewSupply: (kilometer: Omit<ISupply, ''>) => void;
}

export function ModalAddNewSupply({ handleAddNewSupply }: IModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [reasonItem, setReason] = useState('');

  const handleSubmit = useCallback(
    async (data: ISupply) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.date().required('Data é obrigatória'),
          // type: Yup.string().required('O tipo é obrigatório'),
          quantity: Yup.number()
            .required('A quantidade é obrigatória')
            .positive('A quantidade deve ser positiva'),

          amount_total: Yup.number()
            .required('O valor total é obrigatório')
            .positive('O valor deve ser positivo'),

          km_odometer: Yup.number()
            .required('KM é obrigatório')
            .positive('KM deve ser positivo'),

          // observations: Yup.string().required('Destino é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { date, quantity, amount_total, km_odometer, observation } = data;

        const formatData = {
          date,
          type: reasonItem,
          quantity,
          amount_total,
          km_odometer,
          observation,
        };

        handleAddNewSupply(formatData);

        apllyToast('success', 'Sucesso ao adicionar abastecimento!');
        onClose();
        setReason('');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }

        apllyToast('warning', 'Problemas ao adicionar abastecimento!');
        onClose();
      }
    },
    [handleAddNewSupply, onClose, reasonItem],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handleReason = useCallback(e => {
    setReason(e);
  }, []);

  return (
    <>
      <Tooltip hasArrow label="Novo Km">
        <Button
          as="a"
          size="sm"
          colorScheme="blue"
          fontWeight="medium"
          onClick={onOpen}
          cursor="pointer"
        >
          <Icon as={RiAddLine} fontSize="20" />
          {isWideVersion && <Text>Adicionar novo Abastecimento</Text>}
        </Button>
      </Tooltip>
      <ModalComponent
        title="Novo abastecimento"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <p>Data do abastecimento</p>
            <Input
              type="datetime-local"
              name="date"
              placeholder="Ex: 01/01/2022"
            />

            <Select
              name="type"
              label="Tipo de combustível"
              value={reasonItem}
              onChange={e => {
                handleReason(e.target.value);
              }}
              options={[
                {
                  value: 'Gasolina',
                  label: 'Gasolina',
                },
                { value: 'Álcool', label: 'Álcool' },
                {
                  value: 'Diesel S500',
                  label: 'Diesel S500',
                },
                {
                  value: 'Diesel S10',
                  label: 'Diesel S10',
                },
              ]}
            />

            <p>Quantidade abastecido</p>
            <Input type="number" name="quantity" placeholder="Ex: 1.200" />

            <p>Custo total</p>
            <InputGroup>
              <Input
                type="number"
                name="amount_total"
                placeholder="Ex: 1.200"
              />
            </InputGroup>

            <p>KM do Ôdometro</p>
            <Input type="number" name="km_odometer" placeholder="Ex: 1.200" />

            <p>Observações</p>
            <TextArea name="observation" />

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Fechar
              </Button>
              <Button variant="ghost" type="submit">
                {loading ? (
                  <div {...containerProps} ref={componentRef}>
                    {indicatorEl}
                  </div>
                ) : (
                  'Salvar'
                )}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalComponent>
    </>
  );
}
