/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable spaced-comment */
/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  Button,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
  ModalBody,
  ModalFooter,
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

interface IKilometers {
  // vehicle_id?: string;
  // access_id?: string;
  km_start: number;
  km_end: number;
  km_traveled: number;
  observations: string;
  reason: string;
  date: string;
}

interface IModalProps {
  km_initial: number;
  // eslint-disable-next-line no-unused-vars
  handleAddNewKilometer: (kilometer: Omit<IKilometers, ''>) => void;
}

export function ModalAddNewKilometer({
  handleAddNewKilometer,
  km_initial,
}: IModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [reasonItem, setReason] = useState('');

  // const [km_start, setKm_start] = useState(0);
  const [km_endData, setKm_end] = useState(0);
  const [km_traveledData, setKm_traveled] = useState(0);

  const handleSubmit = useCallback(
    async (data: IKilometers) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.date().required('Data é obrigatória'),
          km_start: Yup.string()
            .required('Km inicial é obrigatório')
            .min(1, 'km inicial deve ser maior que zero'),
          km_end: Yup.string().required('Km final é obrigatório'),
          km_traveled: Yup.number()
            .required('Km percorrido é obrigatório')
            .positive('Km percorrido deve ser positivo'),

          // reason: Yup.string().required('Motivo é obrigatório'),

          observations: Yup.string().required('Destino é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { km_end, km_start, km_traveled, observations, date } = data;
        const formatData = {
          km_end,
          km_start,
          km_traveled,
          observations,
          reason: reasonItem,
          date,
        };

        handleAddNewKilometer(formatData);
        setKm_traveled(0);
        apllyToast('success', 'Sucesso ao adicionar km!');
        onClose();

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }
        setKm_traveled(0);
        apllyToast('warning', 'Problemas ao adicionar km!');
        onClose();
      }
    },
    [handleAddNewKilometer, onClose, reasonItem],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handlekm_end = useCallback(e => {
    setKm_end(e.target.value);
  }, []);

  useEffect(() => {
    setKm_traveled(km_endData - km_initial);
  }, [km_endData, km_initial]);

  useEffect(() => {
    setKm_traveled(0);
  }, [isOpen]);

  const handleReason = useCallback(e => {
    setReason(e);
  }, []);

  const handleOpenModal = useCallback(() => {
    console.log(km_initial);
    if (km_initial !== 0) {
      onOpen();
    } else {
      apllyToast('warning', 'Selecione um veiculo!');
    }
  }, [km_initial, onOpen]);

  return (
    <>
      <Tooltip hasArrow label="Novo Km">
        <Button
          as="a"
          size="sm"
          colorScheme="blue"
          fontWeight="medium"
          onClick={handleOpenModal}
          cursor="pointer"
        >
          <Icon as={RiAddLine} fontSize="20" />
          {isWideVersion && <Text>Adicionar novo KM</Text>}
        </Button>
      </Tooltip>
      <ModalComponent
        title="Nova quilometragem"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <p>Data</p>
            <Input type="datetime-local" name="date" />
            <p>Quilometragem inicial</p>
            <Input
              value={km_initial}
              type="number"
              name="km_start"
              placeholder="Exemplo: 1.200"
              variant="filled"
              bg="gray.800"
            />

            <p>Quilometragem final</p>
            <Input
              onChange={handlekm_end}
              type="number"
              name="km_end"
              placeholder="Exemplo: 1.200"
            />

            <p>Quilometro percorrido</p>
            <Input
              value={km_traveledData}
              type="number"
              name="km_traveled"
              placeholder="Exemplo: 1.200"
              variant="filled"
              bg="gray.800"
            />

            <Select
              name="reason"
              label="Qual o motivo?"
              value={reasonItem}
              onChange={e => {
                handleReason(e.target.value);
              }}
              options={[
                {
                  value: 'Consultoria de venda',
                  label: 'Consultoria de venda',
                },
                { value: 'Entrega de produto', label: 'Entrega de produto' },
                {
                  value: 'Deslocamento a trabalho',
                  label: 'Deslocamento a trabalho',
                },
                {
                  value: 'Uso Particular',
                  label: 'Uso Particular',
                },
              ]}
            />

            <p>Qual o destino?</p>
            <TextArea name="observations" placeholder="Ex: visita técnica." />

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
