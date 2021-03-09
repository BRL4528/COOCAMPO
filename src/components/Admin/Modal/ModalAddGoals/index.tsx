/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiLink2, FiPlus } from 'react-icons/fi';

import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';

import {
  Form,
  ContainerSub,
  CardSub,
  ContainerAnalytic,
  CardAnalytic,
  DivLeft,
} from './styles';

import Input from '../../../Global/Input';
import TextArea from '../../../Global/TextArea';
import Button from '../../../Global/Button';
import Select from '../../../Global/Select';

import Modal from '../index';
import api from '../../../../services/api';

interface IGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
  observations: string;
  codccu?: string;
}

interface IModalProps {
  isOpen: boolean;
  dataEditGoal: string;
  setIsOpen: () => void;
  handleGoals: (goal: Omit<IGoals, 'id'>) => void;
}

interface AddGoalsModal {
  id: string;
  name: string;
  weight: string;
  type: string;
  source: string;
  observations: string;
  codccu?: string;
  sub_goals_of_goals?: [
    {
      id: string;
      sub_goals: {
        id: string;
        name: string;
      };
    },
  ];
}

interface DataSubGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
}

interface IAnalyticModule {
  id: string;
  name: string;
  responsible: string;
  condition: string;
  observations: string;
  codccu?: string;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleGoals,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [openSubGoals, setOpenSubGoals] = useState(false);
  const [openAnalyticModule, setAnlalyticModule] = useState(false);
  const [selectedSubGoalsItems, setSelectedSubGoalsItems] = useState<string[]>(
    [],
  );

  const [dataSubGoals, setDataSubGoals] = useState<DataSubGoals[]>([]);
  const [selectedAnalyticItems, setSelectedAnalyticItems] = useState<string[]>(
    [],
  );

  const [analyticModule, setAnalyticModule] = useState<IAnalyticModule[]>([]);

  useEffect(() => {
    try {
      api.get('/sub-goals').then(response => {
        setDataSubGoals(response.data);
      });

      api.get('/analysis-module').then(response => {
        setAnalyticModule(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const hanleOpenSubGoals = useCallback(() => {
    setOpenSubGoals(!openSubGoals);
    setAnlalyticModule(false);
  }, [openSubGoals]);

  const handleOpenAnalyticModule = useCallback(() => {
    setAnlalyticModule(!openAnalyticModule);
    setOpenSubGoals(false);
  }, [openAnalyticModule]);

  const handleSubmit = useCallback(
    async (data: AddGoalsModal) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da meta obrigatório'),
          weight: Yup.number().required('Peso obrigatório'),
          source: Yup.string(),
          observations: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const status = 'ativo';

        const { name, observations, source, weight, type, codccu } = data;

        const formData = {
          name,
          observations,
          source,
          weight,
          status,
          type,
          codccu,
        };

        const response = await api.post('/goals', formData);

        handleGoals(formData);

        if (selectedAnalyticItems.length > 0) {
          // await api.put(
          //   `/analysis-module?analyze_module_id=${selectedAnalyticItems[0]}`,
          //   {
          //     url: `http://localhost:3000/painel-analytic-module?${response.data.id}`,
          //   },
          // );

          await api.post('analysis-module-of-goals', {
            analyze_module_id: selectedAnalyticItems[0],
            goal_id: response.data.id,
          });
        }

        if (selectedSubGoalsItems.length > 0) {
          await api.post('/sub-goals-of-goals/create-all', {
            sub_goals_ids: selectedSubGoalsItems,
            goal_id: response.data.id,
          });
        }

        addToast({
          type: 'success',
          title: 'Meta do setor',
          description: 'Criada sucesso com sucesso',
        });

        setIsOpen();
      } catch (err) {
        console.log(err);
        setIsOpen();
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao criar nova meta.',
        });
      }
    },
    [
      addToast,
      handleGoals,
      selectedAnalyticItems,
      selectedSubGoalsItems,
      setIsOpen,
    ],
  );

  const handleSelectSubGoalsItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedSubGoalsItems.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedSubGoalsItems.filter(
          (item: string) => item !== id,
        );

        setSelectedSubGoalsItems(filteredItems);
      } else {
        setSelectedSubGoalsItems([...selectedSubGoalsItems, id]);
      }
    },
    [selectedSubGoalsItems],
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedAnalyticItems.findIndex(
        (item: string) => item === id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedAnalyticItems.filter(
          (item: string) => item !== id,
        );

        setSelectedAnalyticItems(filteredItems);
      } else {
        setSelectedAnalyticItems([id]);
      }
    },
    [selectedAnalyticItems],
  );

  const options = [
    { value: 'Meta global', label: 'Meta global' },
    { value: 'Meta do setor', label: 'Meta do setor' },
    { value: 'Meta individual', label: 'Meta individual' },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        openSub={openSubGoals}
        openAnalytic={openAnalyticModule}
        onSubmit={handleSubmit}
      >
        <span>
          <div>
            <h2>Adicionar nova meta</h2>
            <FiPlus size={20} />
          </div>

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <header>
          <div>
            <p>Nome da meta</p>
            <Input
              name="name"
              placeholder="Ex: Inconformidades dos orçamento "
            />
          </div>
          <div>
            <p>Peso da meta</p>
            <Input
              type="number"
              step="0.010"
              name="weight"
              placeholder="Ex: 10"
            />
          </div>
        </header>

        <p>Resultado previsto</p>
        <Input name="source" step="0.010" placeholder="Ex: 5" />

        <p>Código do setor</p>
        <Input name="codccu" placeholder="Ex: 1000258" />

        <p>Modalidade da meta</p>
        <Select name="type" options={options} />
        <p>Prazo da meta</p>
        <Input type="date" name="date" placeholder="Prazo" />

        <p>Observações</p>
        <TextArea
          name="observations"
          placeholder="Ex: Meta destinada a analisar a inclusão das inconformidades"
        />

        <nav>
          <span>
            <button
              name="analyticModule"
              onClick={handleOpenAnalyticModule}
              type="button"
            >
              Atribuir módulo de análise
              <FiLink2 size={20} />
            </button>

            <button name="subGoals" onClick={hanleOpenSubGoals} type="button">
              Atribuir submeta
              <FiLink2 size={20} />
            </button>
          </span>

          <ContainerSub>
            {dataSubGoals.map(sub => (
              <CardSub
                onClick={() => handleSelectSubGoalsItem(sub.id)}
                key={sub.id}
                openSub={openSubGoals}
                className={
                  selectedSubGoalsItems.includes(sub.id) ? 'selected' : ''
                }
              >
                <h4>{sub.name}</h4>
              </CardSub>
            ))}
          </ContainerSub>

          <ContainerAnalytic>
            {analyticModule.map(analytic => (
              <CardAnalytic
                onClick={() => handleSelectItem(analytic.id)}
                key={analytic.id}
                openAnalytic={openAnalyticModule}
                className={
                  selectedAnalyticItems.includes(analytic.id) ? 'selected' : ''
                }
              >
                <h4>{analytic.name}</h4>
              </CardAnalytic>
            ))}
          </ContainerAnalytic>

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

export default ModalAddFood;
