import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import { useLoading, Oval } from '@agney/react-loading';

import { toast } from 'react-toastify';
import { Form, DivLeft } from './styles';

import Button from '../../../../../components/Global/Button';

import Modal from '../../../../../components/Admin/Modal';
import Input from '../../../../../components/Global/Input';
import TextArea from '../../../../../components/Global/TextArea';

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

  // const [km_start, setKm_start] = useState(0);
  const [km_end, setKm_end] = useState(0);
  const [km_traveled, setKm_traveled] = useState(0);

  const handleSubmit = useCallback(
    async (data: IKilometers) => {
      try {
        setLoading(true);

        handleAddNewKilometer(data);

        setIsOpen();
        setKm_traveled(0);

        toast('Sucesso ao abrir nova OS!', {
          position: 'bottom-right',
          autoClose: 5000,
          type: 'success',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setIsOpen();
        setKm_traveled(0);
        toast('Problemas ao abrir nova OS!', {
          position: 'bottom-right',
          autoClose: 5000,
          type: 'warning',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
    },
    [handleAddNewKilometer, setIsOpen],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handlekm_end = useCallback(e => {
    setKm_end(e.target.value);
  }, []);

  useEffect(() => {
    if (km_initial?.km_start && km_end > km_initial?.km_start) {
      setKm_traveled(km_end - km_initial?.km_start);
    }
  }, [km_end, km_initial?.km_start]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={km_initial}>
        <span>
          <h2>Nova quilometragen</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <section>
          <span>
            <p>Quilometragem inicial</p>
            <Input type="number" name="km_start" placeholder="1.200" />
          </span>

          <span>
            <p>Quilometragem final</p>
            <Input
              onChange={handlekm_end}
              type="number"
              name="km_end"
              placeholder="1.200"
            />
          </span>
        </section>

        <p>Quilometro percorrido</p>
        <Input
          value={km_traveled}
          type="number"
          name="km_traveled"
          placeholder="1.200"
        />

        <p>Qual o destino?</p>
        <TextArea name="observations" placeholder="Ex: visita técnica." />

        <p>Qual o motivo?</p>
        <TextArea name="reason" placeholder="Ex: venda de insumos." />

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
