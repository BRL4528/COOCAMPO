/* eslint-disable no-unused-vars */

import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiPlus } from 'react-icons/fi';

import { Form, DivLeft } from './styles';

import Input from '../../../../components/Global/Input';
import Button from '../../../../components/Global/Button';
import TextArea from '../../../../components/Global/TextArea';

import Modal from '../../../../components/Admin/Modal';

interface IVehicles {
  id?: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: string;
  observations: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleVehicle: (vehicle: Omit<IVehicles, ''>) => void;
}

const ModalAddVehicle: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleVehicle,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IVehicles) => {
      handleVehicle(data);
      setIsOpen();
    },
    [handleVehicle, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <div>
            <h2>Adicionar novo veículo</h2>
            <FiPlus size={20} />
          </div>

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <header>
          <p>Nome do veículo</p>
          <Input type="text" name="name" placeholder="Ex: Fiat Strada" />

          <p>Placa do veículo</p>
          <Input name="plate" type="text" placeholder="Ex: 589E8FR" />
        </header>

        <p>Ano do veículo</p>
        <Input type="text" name="year" placeholder="Ex: ano 2021 modelo 2022" />
        <p>Tipo de combustível</p>
        <Input type="text" name="fuel" placeholder="Ex: flex" />

        <p>Quilometragem atual</p>
        <Input type="number" name="km" placeholder="Ex: 1.000" />

        <p>Observação geral</p>
        <TextArea
          name="observations"
          placeholder="Ex: Veículo entregue ao setor em estado novo"
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

export default ModalAddVehicle;
