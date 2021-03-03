/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiLink2, FiEdit2 } from 'react-icons/fi';

import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';

import { Form, ContainerSub, CardSub, DivLeft } from './styles';

import Input from '../../../Global/Input';
import Select from '../../../Global/Select';
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
  email: string;
  branch: string;
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
  dataEditSector: string;
  setIsOpen: () => void;
  handleSector: (sector: Omit<ISector, ''>) => void;
  // setDataEditSector: () => void;
}

interface IGoalsAnalytics {
  id: string;
  status_of_conclusion: boolean;
  sector: ISector;
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

const ModalEditSector: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleSector,
  dataEditSector,
  // setDataEditSector,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [selectedGoalsItems, setSelectedGoalsItems] = useState<string[]>([]);
  const [currentGoals, setCurrentGoals] = useState<string[]>([]);

  const [opengoals, setOpenGoals] = useState<boolean>(false);
  const [dataGoals, setDataGoals] = useState<IGoals[]>([]);

  const [dataInitialSector, setDataInitialSector] = useState<ISector>();
  // const [dataInitialGoals, setDataInitialGoals] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen === false) {
      setSelectedGoalsItems([]);
      setCurrentGoals([]);
      setDataInitialSector({
        id: '',
        name: '',
        leader: '',
        branch: '',
        email: '',
        observations: '',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    api.get('/goals').then(response => {
      setDataGoals(response.data);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (dataEditSector !== '') {
        api
          .get<IGoalsAnalytics[]>(
            `/goals-of-sectors?sector_id=${dataEditSector}`,
          )
          .then(response => {
            if (response.data) {
              // const initialSector = {
              //   id: response.data[0].sector.id,
              //   name: response.data[0].sector.name,
              //   leader: response.data[0].sector.leader,
              //   email: response.data[0].sector.email,
              //   branch: response.data[0].sector.branch,
              //   // observations: response.data[0].sector.observations,
              // };
              const initialGoals:
                | IGoals
                | ((prevState: IGoals | undefined) => IGoals | undefined)
                | string[]
                | undefined = [];

              response.data.forEach(function (goals) {
                initialGoals.push(goals.goals.id);
              });
              setSelectedGoalsItems(initialGoals);
              setCurrentGoals(initialGoals);
            }
          });
        api.get<ISector>(`sectors/${dataEditSector}`).then(res => {
          setDataInitialSector(res.data);
        });
        setOpenGoals(true);
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

        const { name, leader, branch, email, id, observations } = data;

        const formData = {
          id,
          name,
          branch,
          email,
          observations,
          leader,
        };
        // Atualiza informações do setor
        await api.put(`/sectors?sector_id=${dataEditSector}`, formData);
        handleSector(formData);

        // verifica se houve alterações nas metas
        const checked = selectedGoalsItems.filter(a =>
          currentGoals.includes(a),
        );

        // Cria novo relacionamento entre a meta selecionanda e o setor
        if (currentGoals.length === 0 && selectedGoalsItems.length !== 0) {
          console.log('cria novo relacionamento');
          await api.post('/goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
          });
          // Atualiza se houve alterações
        } else if (!(checked.length === currentGoals.length)) {
          await api.delete(`/goals-of-sectors/${dataEditSector}`);

          await api.post('/goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
          });
          // Atualiza se houve alterações
        } else if (!(checked.length === selectedGoalsItems.length)) {
          await api.delete(`/goals-of-sectors/${dataEditSector}`);

          await api.post('/goals-of-sectors/create-all', {
            goals_ids: selectedGoalsItems,
            sector_id: dataEditSector,
          });
        }

        setIsOpen();
        // setSelectedGoalsItems([]);
        // setDataInitialSector({
        //   id: '',
        //   name: '',
        //   leader: '',
        //   branch: '',
        //   email: '',
        // });
        // setDataEditSector();

        addToast({
          type: 'success',
          title: 'Setor',
          description: 'Setor atualizado com com sucesso',
        });
      } catch (err) {
        console.log(err);
        setIsOpen();
        addToast({
          type: 'error',
          title: 'Erro na ação',
          description: 'Recarregue a pagina e tente novamente.',
        });
      }
    },
    [
      dataEditSector,
      handleSector,
      selectedGoalsItems,
      currentGoals,
      setIsOpen,
      addToast,
    ],
  );

  const options = [
    { value: '0', label: '1-Matriz' },
    { value: '1', label: '2-UPLI' },
    { value: '2', label: '3-UPLII' },
    { value: '3', label: '4-Granja P Alto' },
    { value: '4', label: '5-Agropecuaria' },
    { value: '5', label: '6-Confinamento' },
    { value: '6', label: '7-U.D.G' },
    { value: '7', label: '8-Super Cooasgo' },
    { value: '8', label: '9-Rondonopolis' },
    { value: '9', label: '10-Granja Rio Verde' },
    { value: '10', label: '11-Cerealista' },
  ];

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
          <div>
            <h2>Editar setor</h2>
            <FiEdit2 size={20} />
          </div>

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <p>Nome do setor</p>
        <Input name="name" placeholder="Ex: Contabilidade" />
        <p>Nome do lider</p>
        <Input type="text" name="leader" placeholder="Ex: Antônio Fagundes" />
        <p>E-mail do lider</p>
        <Input
          type="email"
          name="email"
          placeholder="Ex: antonio.fagundes@.empresa.com.br"
        />
        <p>Filial</p>
        <Select name="branch" options={options} />
        <p>Observações</p>
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

export default ModalEditSector;