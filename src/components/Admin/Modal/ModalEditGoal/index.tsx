/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiLink2, FiEdit2 } from 'react-icons/fi';

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
}

interface AnalitycOfGoals {
  id: string;
  analyze_module_id: string;
  goal_id: string;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleGoals,
  dataEditGoal,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [openSubGoals, setOpenSubGoals] = useState(false);
  const [openAnalyticModule, setAnlalyticModule] = useState(false);
  const [selectedSubGoalsItems, setSelectedSubGoalsItems] = useState<string[]>(
    [],
  );
  const [currentSubGoals, setCurrentSubGoals] = useState<string[]>([]);
  const [dataSubGoals, setDataSubGoals] = useState<DataSubGoals[]>([]);

  const [
    dataAnalitycModuleOfGoal,
    setDataAnalitycModuleOfGoal,
  ] = useState<AnalitycOfGoals>();
  const [selectedAnalyticItems, setSelectedAnalyticItems] = useState<string[]>(
    [],
  );
  const [currentAnalyticItem, setcurrentAnalyticItem] = useState<string[]>([]);
  const [analyticModule, setAnalyticModule] = useState<IAnalyticModule[]>([]);

  const [dataInitialGoal, setDataInitialGoal] = useState<AddGoalsModal>();

  useEffect(() => {
    if (isOpen === false) {
      setSelectedAnalyticItems([]);
      setSelectedSubGoalsItems([]);
      setcurrentAnalyticItem([]);
      setCurrentSubGoals([]);
      setDataInitialGoal({
        id: '',
        name: '',
        weight: '',
        type: '',
        source: '',
        observations: '',
        codccu: '',
      });
    }
  }, [isOpen]);

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

  useEffect(() => {
    if (isOpen) {
      if (dataEditGoal !== '') {
        api.get<AddGoalsModal>(`/goals/${dataEditGoal}`).then(response => {
          const initialSector = {
            id: response.data.id,
            name: response.data.name,
            weight: response.data.weight,
            type: response.data.type,
            source: response.data.source,
            observations: response.data.observations,
            codccu: response.data.codccu,
          };

          const initialSubGoals: React.SetStateAction<string[]> = [];

          if (response.data.sub_goals_of_goals) {
            response.data.sub_goals_of_goals.forEach(function (goals) {
              initialSubGoals.push(goals.sub_goals.id);
            });
          }
          setSelectedSubGoalsItems(initialSubGoals);
          setCurrentSubGoals(initialSubGoals);
          setDataInitialGoal(initialSector);
        });

        api
          .get(`/analysis-module-of-goals?goal_id=${dataEditGoal}`)
          .then(response => {
            if (response.data.length > 0) {
              setDataAnalitycModuleOfGoal(response.data[0]);
              setcurrentAnalyticItem([response.data[0].analyze_module_id]);
              setSelectedAnalyticItems([response.data[0].analyze_module_id]);
              // setIdSector([response.data[0].goal])
            } else {
              setSelectedAnalyticItems([]);
            }
          });
      }
    }
  }, [dataEditGoal, isOpen]);

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

        await api.put(`/goals?goal_id=${dataEditGoal}`, formData);

        handleGoals(formData);

        // verifica se houve alterações nas submetas
        const checked = selectedSubGoalsItems.filter(a =>
          currentSubGoals.includes(a),
        );

        if (
          currentSubGoals.length === 0 &&
          selectedSubGoalsItems.length !== 0
        ) {
          await api.post('/sub-goals-of-goals/create-all', {
            sub_goals_ids: selectedSubGoalsItems,
            goal_id: dataEditGoal,
          });
        } else if (!(checked.length === currentSubGoals.length)) {
          await api.delete(`/sub-goals-of-goals/${dataEditGoal}`);

          await api.post('/sub-goals-of-goals/create-all', {
            sub_goals_ids: selectedSubGoalsItems,
            goal_id: dataEditGoal,
          });
        } else if (!(checked.length === selectedSubGoalsItems.length)) {
          await api.delete(`/sub-goals-of-goals/${dataEditGoal}`);

          await api.post('/sub-goals-of-goals/create-all', {
            sub_goals_ids: selectedSubGoalsItems,
            goal_id: dataEditGoal,
          });
        }

        // Para atualizar o modulo de analise de uma meta, o usuario deve ter
        // selecionado um modulo de analise diferente que estiver ja cadastrado para a meta
        if (!currentAnalyticItem.includes(selectedAnalyticItems[0])) {
          if (
            selectedAnalyticItems.length === 0 &&
            currentAnalyticItem.length > 0
          ) {
            // Se o modulo de analise for igual a [0] ele deve exluir o relacionamente que existir
            // no banco, entre a meta e o modulo de analise

            await api.delete(
              `analysis-module-of-goals/${dataAnalitycModuleOfGoal?.id}`,
            );
            await api.put(
              `/analysis-module?analyze_module_id=${currentAnalyticItem[0]}`,
              {
                url: 'off',
              },
            );
          } else if (
            currentAnalyticItem.length === 0 &&
            selectedAnalyticItems.length > 0
          ) {
            console.log('criar novo');
            await api.post('analysis-module-of-goals', {
              goal_id: dataEditGoal,
              analyze_module_id: selectedAnalyticItems[0],
            });
            await api.put(
              `/analysis-module?analyze_module_id=${selectedAnalyticItems[0]}`,
              {
                url: `https://www.samasc.cloud/painel-analytic-module?${selectedAnalyticItems[0]}`,
              },
            );
          } else if (
            currentAnalyticItem.length > 0 &&
            selectedAnalyticItems.length > 0
          ) {
            console.log('atualiza');
            await api.put(`analysis-module-of-goals/${dataEditGoal}`, {
              analyze_module_id: selectedAnalyticItems[0],
            });

            await api.put(
              `/analysis-module?analyze_module_id=${selectedAnalyticItems[0]}`,
              {
                url: `https://www.samasc.cloud/painel-analytic-module?${selectedAnalyticItems[0]}`,
              },
            );
          }
        }
        setIsOpen();
        addToast({
          type: 'success',
          title: 'Meta do setor',
          description: 'Meta atualizada com sucesso com sucesso',
        });
      } catch (err) {
        console.log(err);
        setIsOpen();
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar informações da meta.',
        });
      }
    },
    [
      dataEditGoal,
      handleGoals,
      selectedSubGoalsItems,
      currentSubGoals,
      currentAnalyticItem,
      selectedAnalyticItems,
      setIsOpen,
      addToast,
      dataAnalitycModuleOfGoal?.id,
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
        initialData={dataInitialGoal}
      >
        <span>
          <div>
            <h2>Editar meta</h2>
            <FiEdit2 size={20} />
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
              step="0.010"
              type="number"
              name="weight"
              placeholder="Ex: 10"
            />
          </div>
        </header>

        <p>Resultado previsto</p>
        <Input step="0.010" name="source" type="number" placeholder="Ex: 5" />

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
