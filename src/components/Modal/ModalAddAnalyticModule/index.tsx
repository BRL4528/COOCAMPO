import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { Form } from './styles';

// import { FormContainer } from './styles';
import Input from '../../Input';
import TextArea from '../../TextArea';
import Button from '../../Button';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';

import Modal from '../index';
// import api from '../../../services/api';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface AnalyticModule {
  name: string;
  responsible: string;
  condition: string;
  observations: string;
}

const ModalAddFood: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: AnalyticModule) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          responsible: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          condition: Yup.string(),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, responsible, condition, observations } = data;

        const formData = {
          name,
          responsible,
          condition,
          observations,
        };
        console.log(formData);
        // await api.put('/analysis-module', formData);
        setIsOpen();

        addToast({
          type: 'success',
          title: 'Módulo de analíse',
          description: 'Criado sucesso com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil.',
        });
      }
    },
    [addToast, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h2>Novo Módo de Análise</h2>

        <Input type="text" name="name" placeholder="Nome do módulo" />

        <Input type="email" name="responsible" placeholder="Representante" />
        <Input type="text" name="condition" placeholder="Condição" />

        <TextArea name="observations" placeholder="Observações" />

        <Button type="submit" data-testid="add-food-button">
          Salvar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
