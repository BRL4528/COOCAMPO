/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiLink2 } from 'react-icons/fi';

import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';

import { Form, ContainerSub, CardSub, DivLeft } from './styles';

import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';

import Modal from '../index';
import api from '../../../../services/api';

// interface AddSectorModal {
//   name: string;
//   leader: string;
//   observations: string;
// }

interface ISector {
  id: string;
  name: string;
  leader: string;
  observations: string;
}

interface IGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
  observations: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleSector: (sector: Omit<ISector, ''>) => void;
}

const ModalAddSector: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleSector,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [selectedGoalsItems, setSelectedGoalsItems] = useState<string[]>([]);

  const [openGoals, setOpenGoals] = useState(false);
  const [dataGoals, setDataGoals] = useState<IGoals[]>([]);

  useEffect(() => {
    api.get('/goals').then(response => {
      setDataGoals(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: ISector) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do setoe é Obrigatório'),
          leader: Yup.string().required('Lider é obrigatório'),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, leader } = data;

        const formData = {
          name,
          // observations,
          leader,
        };

        const response = await api.post('/sectors', formData);
        handleSector(response.data);

        if (selectedGoalsItems.length > 0) {
          await api.post('/goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: response.data.id,
          });
        }

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Setor',
          description: 'Setor criado sucesso com sucesso',
        });
      } catch (err) {
        console.log(err);
        setIsOpen();
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro ao criar novo setor.',
        });
      }
    },
    [addToast, setIsOpen, handleSector, selectedGoalsItems],
  );

  const handleSelectGoalsItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedGoalsItems.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedGoalsItems.filter(
          (item: string) => item !== id,
        );

        setSelectedGoalsItems(filteredItems);
      } else {
        setSelectedGoalsItems([...selectedGoalsItems, id]);
      }
    },
    [selectedGoalsItems],
  );

  const hanleOpenGoals = useCallback(() => {
    setOpenGoals(!openGoals);
  }, [openGoals]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} openGoals={openGoals} onSubmit={handleSubmit}>
        <span>
          <h2>Novo Setor</h2>
          <FiX size={20} onClick={() => setIsOpen()} />
        </span>

        <Input name="name" placeholder="Nome do setor" />

        <Input type="text" name="leader" placeholder="Lider do setor" />

        <TextArea name="observations" placeholder="Descrição" />

        <nav>
          <span>
            <button name="subGoals" onClick={hanleOpenGoals} type="button">
              Atribuir metas
              <FiLink2 size={20} />
            </button>
          </span>

          <ContainerSub>
            {dataGoals.map(sub => (
              <CardSub
                onClick={() => handleSelectGoalsItem(sub.id)}
                key={sub.id}
                openGoals={openGoals}
                className={
                  selectedGoalsItems.includes(sub.id) ? 'selected' : ''
                }
              >
                <h4>{sub.name}</h4>
              </CardSub>
            ))}
          </ContainerSub>

          <DivLeft>
            <Button type="submit" data-testid="add-food-button">
              Salvar
            </Button>
          </DivLeft>
        </nav>
      </Form>
    </Modal>
  );
};

export default ModalAddSector;
