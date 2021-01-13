import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

// import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';

// import { FormContainer } from './styles';
import Input from '../Input';
import Button from '../Button';

import Modal from '../Modal';

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
        <h2>Nova meta</h2>
        <Input name="name" placeholder="Nome da meta" />

        <Input name="weight" placeholder="Peso da meta" />
        <Input name="source" placeholder="" />

        <Input name="term" placeholder="Descrição" />

        <Button type="submit" data-testid="add-food-button">
          Entrar
        </Button>
        {/* <button type="submit">
            <p className="text">Adicionar Meta</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button> */}
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
