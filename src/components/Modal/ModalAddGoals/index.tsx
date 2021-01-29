import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiLink2 } from 'react-icons/fi';

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

  const [openSubGoals, setOpenSubGoals] = useState(false);
  const [openAnalyticModule, setAnlalyticModule] = useState(false);
  const [selectedSubGoalsItems, setSelectedSubGoalsItems] = useState<string[]>(
    [],
  );
  const [selectedAnalyticItems, setSelectedAnalyticItems] = useState<string[]>(
    [],
  );

  // const [itemSelected, setNameSelected] = useState('');

  const hanleOpenSubGoals = useCallback(() => {
    setOpenSubGoals(!openSubGoals);
    setAnlalyticModule(false);
  }, [openSubGoals]);

  const handleOpenAnalyticModule = useCallback(() => {
    setAnlalyticModule(!openAnalyticModule);
    setOpenSubGoals(false);
  }, [openAnalyticModule]);

  const handleSubmit = useCallback(
    (data: AddGoalsModal) => {
      console.log(data, selectedSubGoalsItems);
    },
    [selectedSubGoalsItems],
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
    // { value: 'Senior', label: 'Sistema Senior' },
  ];

  const subGoals = [
    { id: '1q', name: 'Orçamento de IPVA' },
    { id: '2q', name: 'Orçamento de Leite' },
    { id: '3q', name: 'Verificação dos pneus' },
  ];

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
        // name={itemSelected}
      >
        <h2>Nova meta</h2>
        <header>
          <Input name="name" placeholder="Nome da meta" />

          <Input type="number" name="weight" placeholder="Peso da meta" />
        </header>

        <Input name="source" placeholder="Meta prevista" />
        <Select name="type" options={options} />

        <Input type="date" name="date" placeholder="Prazo" />

        <TextArea name="term" placeholder="Descrição" />

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
            {/*
            <button onClick={hanleOpenSubGoals} type="button">
              Atribuir importação
              <FiLink2 size={20} />
            </button> */}
            {/*
            <button onClick={hanleOpenSubGoals} type="button">
              Criar nova submeta
              <FiPlus size={20} />
            </button> */}
          </span>

          <ContainerSub>
            {subGoals.map(sub => (
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
          {/*
          <ContainerSub>
            {subGoals.map(sub => (
              <CardSub key={sub.id} openSub={openSubGoals}>
                <h4>{sub.name}</h4>
              </CardSub>
            ))}
          </ContainerSub> */}
          <Button type="submit" data-testid="add-food-button">
            Salvar
          </Button>
        </nav>

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
