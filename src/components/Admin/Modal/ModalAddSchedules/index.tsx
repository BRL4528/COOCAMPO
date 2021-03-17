import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form, DivLeft } from './styles';

// import { FormContainer } from './styles';
import Input from '../../../Global/Input';
import Button from '../../../Global/Button';

import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Modal from '../index';
import api from '../../../../services/api';
import Select from '../../../Global/SelectRelease';

interface IAnalyticModule {
  id: string;
  name: string;
  address: string;
  name_schedule: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAnalytic: (analytic: Omit<IAnalyticModule, 'status'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAnalytic,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [subject, setSubject] = useState('');

  const handleSubmit = useCallback(
    async (data: IAnalyticModule) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          address: Yup.string()
            .required('E-mail do representante obrigátorio')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, address } = data;

        const formData = {
          name,
          address,
          name_schedule: subject,
        };

        const response = await api.post('/schedules', formData);
        handleAnalytic(response.data);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Email adicionado',
          description: 'email adicionado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro ao adicionar email',
          description: 'Ocorreu um erro ao ao adicionar o email.',
        });
      }
    },
    [addToast, handleAnalytic, setIsOpen, subject],
  );

  const handleSubject = useCallback(
    e => {
      setSubject(e);
    },
    [setSubject],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Novo registro</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <p>Nome representante</p>
        <Input type="text" name="name" placeholder="Ex: Cristiano Mattei" />
        <Select
          name="name_schedule"
          label="Nome da agenda"
          value={subject}
          onChange={e => {
            handleSubject(e.target.value);
          }}
          options={[
            {
              value: 'lider-group',
              label: 'Grupo de lideres',
            },
            { value: 'analytical-group', label: 'Grupo de modulo de análise' },
            {
              value: 'test1-group',
              label: 'teste1',
            },
            {
              value: 'test2-group',
              label: 'teste2',
            },
          ]}
        />
        <p>E-mail do representante</p>
        <Input
          type="email"
          name="address"
          placeholder="Ex: cristiano.mattei@cooasgo.com.br"
        />

        <DivLeft>
          <Button type="submit" data-testid="add-food-button">
            Salvar
          </Button>
        </DivLeft>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
