import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

import { Form } from './styles';

// import { FormContainer } from './styles';
import Input from '../../Input';
import TextArea from '../../TextArea';
import Button from '../../Button';

import Modal from '../index';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface AddGoalsModal {
  name: string;
  weight: string;
  source: string;
  term: string;
}

const ModalAddFood: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: AddGoalsModal) => {
    console.log(data);
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h2>Novo Módo de Análise</h2>

        <Input type="text" name="name" placeholder="Nome do módulo" />

        <Input type="email" name="representative" placeholder="Representante" />
        <Input type="text" name="representative" placeholder="Condição" />

        <TextArea name="term" placeholder="Descrição" />

        <Button type="submit" data-testid="add-food-button">
          Salvar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
