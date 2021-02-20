import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';

import { Form, DivLeft } from './styles';

import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';

import Modal from '../index';
import api from '../../../../services/api';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface AddSubGoalsModal {
  name: string;
  weight: string;
  observations: string;
}

const ModalAddFood: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: AddSubGoalsModal) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da meta obrigatório'),
          weight: Yup.number().required('Peso obrigatório'),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const status = 'ativo';

        const { name, observations, weight } = data;

        const formData = {
          name,
          observations,
          weight,
          status,
        };

        await api.post('/sub-goals', formData);
        setIsOpen();

        addToast({
          type: 'success',
          title: 'Submetas',
          description: 'Criado sucesso com sucesso',
        });
      } catch (err) {
        console.log(err);
        setIsOpen();
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro ao criar nova meta.',
        });
      }
    },
    [addToast, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Nova Submeta</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <Input name="name" placeholder="Nome da meta" />

        <Input type="number" name="weight" placeholder="Peso da meta" />

        <TextArea name="observations" placeholder="Descrição" />

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
