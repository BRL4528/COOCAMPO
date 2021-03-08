import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

import { FiX } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form, DivLeft } from './styles';

import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';

import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Modal from '../index';

interface Occurrence {
  observations?: string;
}
interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  handleOccurrence: (data: Omit<Occurrence, 'status'>) => void;
}

const ModalEditAnalyticModule: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleOccurrence,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: Occurrence) => {
      try {
        const { observations } = data;

        const formData = {
          observations,
        };
        handleOccurrence(formData);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Justificativa salva!',
          description: 'sucesso ao adicionar justificativa',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro ao adicionar justificativa',
          description: 'Contate a adiministração do sistema.',
        });
      }
    },
    [addToast, handleOccurrence, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <h2>Adicionar uma justificativa</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <p>
          Sua avaliação foi inferior a 7, pedimos que adicione uma justificativa
          para que possamos entender e direcionar as ações:
        </p>
        <TextArea
          name="observations"
          placeholder="Descreva aqui sua justificativa."
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

export default ModalEditAnalyticModule;
