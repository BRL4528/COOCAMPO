import React, { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';
import { useLoading, Oval } from '@agney/react-loading';
import { useAuth } from '../../../../../hooks/auth';

import getValidationErrors from '../../../../../utils/getValidationErrors';

import { apllyToast } from '../../../../../components/Global/Toast2.0';
import { Form, DivLeft } from './styles';

import Button from '../../../../../components/Global/Button';
import Modal from '../../../../../components/Admin/Modal';
import Input from '../../../../../components/Global/Input';
import TextArea from '../../../../../components/Global/TextArea';
import Select from '../../../../../components/Global/SelectRelease';

interface ISupply {
  date: Date;
  type: string;
  quantity: number;
  amount_total: number;
  km_odometer: number;
  observation: string;
  conductor: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddNewSupply: (maintenance: Omit<ISupply, ''>) => void;
}

const ModalAddMaintenance: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddNewSupply,
}) => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');

  const handleSubmit = useCallback(
    async (data: ISupply) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          date: Yup.date().required('Data é obrigatória'),
          km_odometer: Yup.number().required('Quilometragem é obrigatório'),
          quantity: Yup.number().required('Quantidade é obrigatório'),
          amount_total: Yup.number().required('Custo total é obrigatório'),
          observation: Yup.string().required('Descrição é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { date, km_odometer, amount_total, observation, quantity } = data;

        const formatData = {
          date: new Date(date),
          km_odometer,
          amount_total,
          observation,
          type,
          conductor: user.name,
          quantity,
        };

        handleAddNewSupply(formatData);

        setIsOpen();

        apllyToast('success', 'Sucesso ao adicionar novo abastecimento!');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setLoading(false);

          formRef.current?.setErrors(errors);

          return;
        }
        setIsOpen();
        apllyToast('warning', 'Problemas ao adicionar novo abastecimento!');
      }
    },
    [handleAddNewSupply, setIsOpen, type, user.name],
  );

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  const handleType = useCallback(e => {
    setType(e);
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Novo Abastecimento</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <p>Data de abastecimento</p>
        <Input type="datetime-local" name="date" />

        <p>Quilometragem</p>
        <Input type="number" name="km_odometer" placeholder="Ex: 1.200" />

        <p>Quantidade</p>
        <Input type="number" name="quantity" placeholder="Ex: 20" />

        <Select
          name="type"
          label="Tipo de manutenção"
          value={type}
          onChange={e => {
            handleType(e.target.value);
          }}
          options={[
            {
              value: 'Gasolina',
              label: 'Gasolina',
            },
            {
              value: 'Alcool',
              label: 'Alcool',
            },
            {
              value: 'Diesel',
              label: 'Diesel',
            },
          ]}
        />

        <p>Custo total</p>
        <Input type="number" name="amount_total" />

        <p>Observações</p>
        <TextArea name="observation" />

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

export default ModalAddMaintenance;
