/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { FiLink2 } from 'react-icons/fi';
import { useToast } from '../../../hooks/toast';

import {
  Form,
  ContainerSub,
  CardSub,
  ContainerAnalytic,
  CardAnalytic,
} from './styles';

// import { FormContainer } from './styles';
import Input from '../../Input';
import TextArea from '../../TextArea';
import Button from '../../Button';
import Select from '../../Select';

import Modal from '../index';
import api from '../../../services/api';

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
  handleGoals: (goal: Omit<IGoals, 'id'>) => void;
}

interface AddGoalsModal {
  name: string;
  weight: string;
  source: string;
  observations: string;
}

interface DataSubGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
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

        const { name, observations, source, weight } = data;

        const formData = {
          name,
          observations,
          source,
          weight,
          status,
        };

        const response = await api.post('/goals', formData);

        handleGoals(formData);

        if (selectedSubGoalsItems.length > 0) {
          await api.post('/sub-goals-of-goals/create-all', {
            subGoalsIds: selectedSubGoalsItems,
            goal_id: response.data.id,
          });
        }

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Meta do setor',
          description: 'Criada sucesso com sucesso',
        });
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
    [addToast, setIsOpen, handleGoals, selectedSubGoalsItems],
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
    { value: 'sage', label: 'Sistema Sage' },
    { value: 's2', label: 'Sistema S2' },
    { value: 'Senior', label: 'Sistema Senior' },
    { value: 'Módulo de análise', label: 'Módulo de análise' },
  ];

  useEffect(() => {
    api.get('/sub-goals').then(response => {
      setDataSubGoals(response.data);
    });
  });

  const analyticModule = [
    { id: '1', name: 'Verificação do uso de EPI' },
    { id: '2', name: 'Verificação de Limpeza area externa' },
    { id: '3', name: 'Estoque Insumos agricolas' },
    { id: '4', name: 'Fechamento UPL I' },
    { id: '5', name: 'Organização de contratos' },
    { id: '6', name: 'Fechamento UPL I' },
    { id: '7', name: 'Organização de contratos' },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        openSub={openSubGoals}
        openAnalytic={openAnalyticModule}
        onSubmit={handleSubmit}
      >
        <h2>Nova meta</h2>
        <header>
          <Input name="name" placeholder="Nome da meta" />

          <Input type="number" name="weight" placeholder="Peso da meta" />
        </header>

        <Input name="source" placeholder="Meta prevista" />
        <Select name="type" options={options} />

        <Input type="date" name="date" placeholder="Prazo" />

        <TextArea name="observations" placeholder="Descrição" />

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

          <Button type="submit" data-testid="add-food-button">
            Salvar
          </Button>
        </nav>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
