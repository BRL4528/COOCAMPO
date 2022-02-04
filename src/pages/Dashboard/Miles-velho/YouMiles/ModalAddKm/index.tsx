import React, { useCallback, useEffect, useRef, useState } from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';
import { useLoading, Oval } from '@agney/react-loading';

import getValidationErrors from '../../../../../utils/getValidationErrors';

import { apllyToast } from '../../../../../components/Global/Toast2.0';
import { Form, DivLeft } from './styles';

import Button from '../../../../../components/Global/Button';
import Modal from '../../../../../components/Admin/Modal';
import Input from '../../../../../components/Global/Input';
import TextArea from '../../../../../components/Global/TextArea';
import Select from '../../../../../components/Global/SelectRelease';

interface IKilometers {
  // vehicle_id?: string;
  // access_id?: string;
  km_start: number;
  km_end: number;
  km_traveled: number;
  observations: string;
  reason: string;
}

interface IModalProps {
  isOpen: boolean;
  km_initial?: {
    km_start: number;
  };
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddNewKilometer: (kilometer: Omit<IKilometers, ''>) => void;
}

const ModalAddKm: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  km_initial,
  handleAddNewKilometer,
}) => {
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  // const [km_start, setKm_start] = useState(0);
  const [km_endData, setKm_end] = useState(0);
  const [km_traveledData, setKm_traveled] = useState(0);

  const handleSubmit = useCallback(
    async (data: IKilometers) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          km_start: Yup.string().required('Km inicial é obrigatório'),
          km_end: Yup.string().required('Km final é obrigatório'),
          km_traveled: Yup.number().required('Km percorrido é obrigatório'),
          // reason: Yup.string().required('Motivo é obrigatório'),
          observations: Yup.string().required('Destino é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { km_end, km_start, km_traveled, observations } = data;

        const formatData = {
          km_end,
          km_start,
          km_traveled,
          observations,
          reason,
        };

        handleAddNewKilometer(formatData);

        setIsOpen();
        setKm_traveled(0);

        apllyToast('success', 'Sucesso ao abrir nova OS!');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }
        setIsOpen();
        setKm_traveled(0);
        apllyToast('warning', 'Problemas ao abrir nova OS!');
      }
    },
    [handleAddNewKilometer, reason, setIsOpen],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handlekm_end = useCallback(e => {
    setKm_end(e.target.value);
  }, []);

  useEffect(() => {
    if (km_initial?.km_start && km_endData > km_initial?.km_start) {
      setKm_traveled(km_endData - km_initial?.km_start);
    }
  }, [km_endData, km_initial?.km_start]);

  const handleReason = useCallback(e => {
    setReason(e);
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={km_initial}>
        <span>
          <h2>Nova quilometragen</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <p>Quilometragem inicial</p>
        <Input type="number" name="km_start" placeholder="1.200" />

        <p>Quilometragem final</p>
        <Input
          onChange={handlekm_end}
          type="number"
          name="km_end"
          placeholder="1.200"
        />

        <p>Quilometro percorrido</p>
        <Input
          value={km_traveledData}
          type="number"
          name="km_traveled"
          placeholder="1.200"
        />

        <Select
          name="reason"
          label="Qual o motivo?"
          value={reason}
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

        <DivLeft>
          <Button
            type="submit"
            data-testid="add-food-button"
            disabled={loading}
            isUsed
          >
            {loading ? (
              <div {...containerProps} ref={componentRef}>
                {indicatorEl}
              </div>
            ) : (
              'Enviar'
            )}
          </Button>
        </DivLeft>
      </Form>
    </Modal>
  );
};

export default ModalAddKm;
