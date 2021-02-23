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
  // observations: string;
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
  dataEditSector: string;
  setIsOpen: () => void;
  handleSector: (sector: Omit<ISector, ''>) => void;
  // setDataEditSector: () => void;
}

interface IGoalsAnalytics {
  id: string;
  status_of_conclusion: boolean;
  sector: {
    id: string;
    name: string;
    leader: string;
    // observations: string;
  };
  goals: {
    id: string;
    name: string;
    status: string;
    weight: string;
    source: string;
    observations: string;
    type: string;
    sub_goals_of_goals: [
      {
        id: string;
        sub_goals: {
          id: string;
          name: string;
        };
      },
    ];
  };
}

const ModalAddSector: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleSector,
  dataEditSector,
  // setDataEditSector,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [selectedGoalsItems, setSelectedGoalsItems] = useState<string[]>([]);

  const [opengoals, setOpenGoals] = useState<boolean>(false);
  const [dataGoals, setDataGoals] = useState<IGoals[]>([]);

  const [dataInitialSector, setDataInitialSector] = useState<ISector>();
  // const [dataInitialGoals, setDataInitialGoals] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen === false) {
      setDataInitialSector({
        id: '',
        name: '',
        leader: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    api.get('/goals').then(response => {
      setDataGoals(response.data);
    });
  }, []);

  // Esperar dev fazer rota api
  useEffect(() => {
    if (isOpen) {
      if (dataEditSector !== '') {
        api
          .get<IGoalsAnalytics[]>(
            `/goals-of-sectors?sector_id=${dataEditSector}`,
          )
          .then(response => {
            console.log('teste', response.data);
            const initialSector = {
              id: response.data[0].sector.id,
              name: response.data[0].sector.name,
              leader: response.data[0].sector.leader,
              // observations: response.data[0].sector.observations,
            };
            const initialGoals:
              | IGoals
              | ((prevState: IGoals | undefined) => IGoals | undefined)
              | string[]
              | undefined = [];

            response.data.forEach(function (goals) {
              initialGoals.push(goals.goals.id);
            });

            setSelectedGoalsItems(initialGoals);
            setDataInitialSector(initialSector);
            setOpenGoals(true);
          });
      }
    }
  }, [dataEditSector, isOpen]);

  const handleSubmit = useCallback(
    async (data: ISector) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do setor é Obrigatório'),
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

        // Cria novo item
        if (dataEditSector === '') {
          console.log('cria um novo setor');
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
        }

        // Atualiza dados editados
        if (dataEditSector) {
          console.log('atualiza setor');
          const response = await api.put(
            `/sectors?sector_id=${dataEditSector}`,
            formData,
          );
          console.log(formData);

          if (selectedGoalsItems.length > 0) {
            await api.post('/goals-of-sectors/create-all', {
              goals_ids: selectedGoalsItems,
              sector_id: response.data.id,
            });
          }

          setIsOpen();
          setSelectedGoalsItems([]);
          setDataInitialSector({
            id: '',
            name: '',
            leader: '',
          });
          // setDataEditSector();

          addToast({
            type: 'success',
            title: 'Setor',
            description: 'Setor atualizado sucesso com sucesso',
          });
        }
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
    [dataEditSector, handleSector, selectedGoalsItems, setIsOpen, addToast],
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
    setOpenGoals(!opengoals);
  }, [opengoals]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* {console.log(dataInitialSector)} */}
      <Form
        ref={formRef}
        opengoals={opengoals}
        onSubmit={handleSubmit}
        initialData={dataInitialSector}
      >
        <span>
          {dataEditSector === '' ? (
            <h2>Criar novo setor</h2>
          ) : (
            <h2>Editar setor existente</h2>
          )}

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
                opengoals={opengoals}
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
