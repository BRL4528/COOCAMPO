import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Icon,
  useDisclosure,
  Tooltip,
  ModalBody,
  ModalFooter,
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
  id_kilometer: string;
  // eslint-disable-next-line no-unused-vars
  handleEditKilometer: (kilometer: Omit<IKilometers, ''>) => void;
}

export function ModalEditNewKilometer({
  handleEditKilometer,
  id_kilometer,
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

  const [initialData, setInitialData] = useState<IKilometers>();

  useEffect(() => {
    try {
      if (isOpen) {
        api
          .get<IKilometers>(`/kilometers/show?id=${id_kilometer}`)
          .then(response => {
            setReason(response.data.reason);
            setInitialData(response.data);
          });
      }
    } catch (e) {
      console.log(e);
      apllyToast('error', 'Problemas ao carregar quilometragem');
    }
  }, [id_kilometer, isOpen]);

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
          id: id_kilometer,
        };

        handleEditKilometer(formatData);
        onClose();

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }
        onClose();
      }
    },
    [handleEditKilometer, id_kilometer, onClose, reasonItem],
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
          bg="gray.650"
          // variant="ghost"
          onClick={onOpen}
          cursor="pointer"
        >
          <Icon as={RiPencilLine} fontSize="20" color="white.100" />
        </Button>
      </Tooltip>
      <ModalComponent
        title="Editar quilometragem"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <p>Data</p>
            <Input type="string" name="date" />
            <p>Quilometragem inicial</p>
            <Input
              type="number"
              name="km_start"
              placeholder="Exemplo: 1.200"
              // variant="filled"
            />

            <p>Quilometragem final</p>
            <Input type="number" name="km_end" placeholder="Exemplo: 1.200" />

            <p>Quilometro percorrido</p>
            <Input
              type="number"
              name="km_traveled"
              placeholder="Exemplo: 1.200"
              // variant="filled"
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
