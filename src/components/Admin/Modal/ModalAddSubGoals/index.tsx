import React, { useCallback, useRef, useEffect, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiPlus, FiEdit2 } from 'react-icons/fi';

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
  dataEditSubGoal: string;
  setIsOpen: () => void;
}

interface AddSubGoalsModal {
  name: string;
  weight: string;
  observations: string;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  dataEditSubGoal,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [
    dataInitialSubGoal,
    setDataInitialSubGoal,
  ] = useState<AddSubGoalsModal>();

  useEffect(() => {
    if (isOpen === false) {
      setDataInitialSubGoal({
        name: '',
        weight: '',
        observations: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (dataEditSubGoal !== '') {
        api
          .get<AddSubGoalsModal>(`/sub-goals/${dataEditSubGoal}`)
          .then(response => {
            setDataInitialSubGoal(response.data);
          });
      }
    }
  }, [dataEditSubGoal, isOpen]);

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

        if (dataEditSubGoal === '') {
          await api.post('/sub-goals', formData);
          setIsOpen();

          addToast({
            type: 'success',
            title: 'Submetas',
            description: 'Criado sucesso com sucesso',
          });
        }
        if (dataEditSubGoal !== '') {
          await api.put(`/sub-goals?sub_goal_id=${dataEditSubGoal}`, formData);

          setIsOpen();

          addToast({
            type: 'success',
            title: 'Submetas',
            description: 'Submeta atualizada com sucesso com sucesso',
          });
        }
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
    [addToast, dataEditSubGoal, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={dataInitialSubGoal}
      >
        <span>
          {dataEditSubGoal === '' ? (
            <div>
              <h2>Adicionar nova submeta</h2>
              <FiPlus size={20} />
            </div>
          ) : (
            <div>
              <h2>Editar submeta</h2>
              <FiEdit2 size={20} />
            </div>
          )}

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <p>Nome da submeta</p>
        <Input name="name" placeholder="Ex: Medidas SST" />
        <p>Peso da submeta</p>
        <Input name="weight" placeholder="Ex: 10" />
        <p>Observações</p>
        <TextArea
          name="observations"
          placeholder="Ex: Submeta destinada ao controle das utilizações corretas dos equipamentos de segurança do trabalho"
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
