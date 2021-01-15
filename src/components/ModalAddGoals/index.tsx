import React, { useCallback, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiLink2, FiPlus } from 'react-icons/fi';

import { Form, ContainerSub, CardSub } from './styles';

// import { FormContainer } from './styles';
import Input from '../Input';
import TextArea from '../TextArea';
import Button from '../Button';
import Select from '../Select';

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

  const [openSubGoals, setOpenSubGoals] = useState(false);

  const hanleOpenSubGoals = useCallback(() => {
    setOpenSubGoals(!openSubGoals);
  }, [openSubGoals]);

  const handleSubmit = useCallback((data: AddGoalsModal) => {
    console.log(data);
  }, []);

  const options = [
    { value: 'sage', label: 'Sistema Sage' },
    { value: 's2', label: 'Sistema S2' },
    { value: 'Senior', label: 'Sistema Senior' },
    // { value: 'Senior', label: 'Sistema Senior' },
  ];

  const subGoals = [
    { id: 1, name: 'Orçamento de IPVA' },
    { id: 2, name: 'Orçamento de Leite' },
    { id: 3, name: 'Verificação dos pneus' },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} openSub={openSubGoals} onSubmit={handleSubmit}>
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
            <button onClick={hanleOpenSubGoals} type="button">
              Atribuir módulo de análise
              <FiLink2 size={20} />
            </button>

            <button onClick={hanleOpenSubGoals} type="button">
              Atribuir submeta
              <FiLink2 size={20} />
            </button>
            <button onClick={hanleOpenSubGoals} type="button">
              Criar nova submeta
              <FiPlus size={20} />
            </button>
          </span>

          <ContainerSub>
            {subGoals.map(sub => (
              <CardSub key={sub.id} openSub={openSubGoals}>
                <h4>{sub.name}</h4>
              </CardSub>
            ))}
          </ContainerSub>
        </nav>

        <Button type="submit" data-testid="add-food-button">
          Salvar
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
