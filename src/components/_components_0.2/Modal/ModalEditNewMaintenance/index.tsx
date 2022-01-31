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

interface IMaintenance {
  date: string;
  type: string;
  amount_total: number;
  km: number;
  description: string;
  reason: string;
}

interface IModalProps {
  id_maintenance: string;

  handleEditAddNewMaintenance: (kilometer: Omit<IMaintenance, ''>) => void;
}

export function ModalEditNewMaintenance({
  id_maintenance,
  handleEditAddNewMaintenance,
}: IModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [reasonItem, setReason] = useState('');

  // const [km_start, setKm_start] = useState(0);
  // const [km_endData, setKm_end] = useState(0);
  // const [km_traveledData, setKm_traveled] = useState(0);

  const [initialData, setInitialData] = useState<IMaintenance>();

  useEffect(() => {
    try {
      if (isOpen) {
        api.get(`/maintenance/show?id=${id_maintenance}`).then(response => {
          setReason(response.data.type);
          setInitialData(response.data);
        });
      }
    } catch (e) {
      console.log(e);
      apllyToast('error', 'Problemas ao carregar manutenção');
    }
  }, [id_maintenance, isOpen]);

  const handleSubmit = useCallback(
    async (data: IMaintenance) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.date().required('Data é obrigatória'),
          // type: Yup.string().required('O tipo é obrigatório'),
          amount_total: Yup.number()
            .required('O valor total é obrigatório')
            .positive('O valor deve ser positivo'),

          reason: Yup.string().required('O motivo é obrigatório'),

          km: Yup.number()
            .required('KM é obrigatório')
            .positive('KM deve ser positivo'),

          // observations: Yup.string().required('Destino é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { date, amount_total, km, description, reason } = data;

        const formatData = {
          date,
          type: reasonItem,
          amount_total,
          km,
          description,
          reason,
          id: id_maintenance,
        };

        handleEditAddNewMaintenance(formatData);
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
    [handleEditAddNewMaintenance, id_maintenance, onClose, reasonItem],
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
        title="Editar manutenção"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <p>Data da manutenção</p>
            <Input type="text" name="date" placeholder="Ex: 01/01/2022" />

            <Select
              name="type"
              label="Tipo da manutenção"
              value={reasonItem}
              onChange={e => {
                handleReason(e.target.value);
              }}
              options={[
                {
                  value: 'Corretiva',
                  label: 'Corretiva',
                },
                { value: 'Preventiva', label: 'Preventiva' },
              ]}
            />

            <p>Custo total</p>
            <Input type="number" name="amount_total" placeholder="Ex: 1.200" />

            <p>Motivo</p>
            <InputGroup>
              <Input
                type="text"
                name="reason"
                placeholder="Ex: data prevista para manutenção"
              />
            </InputGroup>

            <p>KM do Ôdometro</p>
            <Input type="number" name="km" placeholder="Ex: 1.200" />

            <p>Descrição</p>
            <TextArea name="description" />

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
