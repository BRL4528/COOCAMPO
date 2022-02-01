import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Icon,
  useDisclosure,
  Tooltip,
  ModalBody,
  ModalFooter,
  InputGroup,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { RiPencilLine } from 'react-icons/ri';
import { useLoading, Oval } from '@agney/react-loading';
import { apllyToast } from '../../../Global/Toast2.0';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Select from '../../../Global/SelectRelease';
import { ModalComponent } from '..';

import { api } from '../../../../services/api';

interface ISupply {
  date: string;
  type: string;
  quantity: number;
  amount_total: number;
  km_odometer: number;
  observation: string;
}

interface IModalProps {
  id_supply: string;
  // eslint-disable-next-line no-unused-vars
  handleEditSupply: (kilometer: Omit<ISupply, ''>) => void;
}

export function ModalEditNewSupply({
  handleEditSupply,
  id_supply,
}: IModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  // const isWideVersion = useBreakpointValue({
  //   base: false,
  //   lg: true,
  // });

  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [reasonItem, setReason] = useState('');

  // const [km_start, setKm_start] = useState(0);
  // const [km_endData, setKm_end] = useState(0);
  // const [km_traveledData, setKm_traveled] = useState(0);

  const [initialData, setInitialData] = useState<ISupply>();

  useEffect(() => {
    try {
      if (isOpen) {
        api.get(`/supplies/show?id=${id_supply}`).then(response => {
          setReason(response.data.type);
          setInitialData(response.data);
        });
      }
    } catch (e) {
      console.log(e);
      apllyToast('error', 'Problemas ao carregar quilometragem');
    }
  }, [id_supply, isOpen]);

  const handleSubmit = useCallback(
    async (data: ISupply) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.date().required('Data é obrigatória'),
          // type: Yup.string().required('O tipo é obrigatório'),
          quantity: Yup.number().required('A quantidade é obrigatória'),
          // .positive('A quantidade deve ser positiva'),

          amount_total: Yup.number().required('O valor total é obrigatório'),
          // .positive('O valor deve ser positivo'),

          km_odometer: Yup.number().required('KM é obrigatório'),
          // .positive('KM deve ser positivo'),

          // reason: Yup.string().required('Motivo é obrigatório'),

          observation: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { amount_total, date, km_odometer, observation, quantity } = data;

        const formatData = {
          amount_total,
          km_odometer,
          observation,
          quantity,
          date,
          id: id_supply,
          type: reasonItem,
        };
        handleEditSupply(formatData);
        onClose();

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }
        apllyToast('warning', 'Problemas ao editar km!');
        onClose();
      }
    },
    [handleEditSupply, id_supply, onClose, reasonItem],
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
      <Tooltip bg="gray.650" hasArrow label="Editar">
        <Button
          size="sm"
          fontSize="sm"
          // variant="ghost"
          onClick={onOpen}
          cursor="pointer"
        >
          <Icon as={RiPencilLine} fontSize="20" color="white.100" />
        </Button>
      </Tooltip>
      <ModalComponent
        title="Editar abastecimento"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <p>Data do abastecimento</p>
            <Input type="text" name="date" placeholder="Ex: 01/01/2022" />

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
            <Input
              type="number"
              step="0.01"
              name="quantity"
              placeholder="Ex: 1.200"
            />

            <p>Custo total</p>
            <InputGroup>
              <Input
                type="number"
                step="0.01"
                name="amount_total"
                placeholder="Ex: 1.200"
              />
            </InputGroup>

            <p>KM do Ôdometro</p>
            <Input type="number" name="km_odometer" placeholder="Ex: 1200" />

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
