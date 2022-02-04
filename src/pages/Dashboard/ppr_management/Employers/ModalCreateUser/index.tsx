/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';

import { FiX, FiPlus } from 'react-icons/fi';

import MultiSelect from 'react-multi-select-component';
import { Form, DivLeft } from './styles';

import Input from '../../../../../components/Global/Input';
import Select from '../../../../../components/Global/Select';
import Button from '../../../../../components/Global/Button';

import Modal from '../../../../../components/Admin/Modal';
import { api } from '../../../../../services/api';

interface IUser {
  name: string;
  nickname: string;
  password: string;
  tag: string;
  email: string;
}

interface IOptions {
  value: string;
  label: string;
}

interface IHandleUser {
  userData: IUser;
  infoSectors: IOptions[];
  infoModules: IOptions[];
}

interface IModalProps {
  isOpen: boolean;
  // dataEditSector: string;
  setIsOpen: () => void;
  handleUser: (user: Omit<IHandleUser, ''>) => void;
  // setDataEditSector: () => void;
}

const ModalAddSector: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUser,
  // dataEditSector,
  // setDataEditSector,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [sectorSelected, setSectorSelected] = useState([]);
  const [moduleSelected, setModuleSelected] = useState([]);
  const [sectorFormated, setSectorFormated] = useState<IOptions[]>([]);

  const options = [
    { value: 'admin', label: 'Acesso para um adiminstrador' },
    { value: 'admin-os', label: 'Acesso para um adm de ordens de serviços' },
    { value: 'user', label: 'Acesso comum' },
  ];
  const modules = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'goals_and_sub_goals', label: 'Metas e Submetas' },
    { value: 'sector', label: 'Setor' },
    { value: 'employers', label: 'Colaboradores' },
    { value: 'module_analyze', label: 'Módulo de analíse' },
    { value: 'report', label: 'Relatórios' },
    { value: 'service_send_email', label: 'Email' },
    { value: 'schedule', label: 'Agenda' },
  ];

  const Internationalization = {
    allItemsAreSelected: 'Todos os itens selecionados.',
    clearSearch: 'Limpar pesquisa',
    noOptions: 'Sem opções',
    search: 'Pesquisar',
    selectAll: 'Selecionar todos',
    selectSomeItems: 'Selecione...',
  };

  useEffect(() => {
    api.get('/sectors').then(response => {
      const sectorFormateded: React.SetStateAction<any[]> = [];

      response.data.forEach(function (sector: { id: string; name: string }) {
        const option = {
          value: sector.id,
          label: sector.name,
        };
        sectorFormateded.push(option);
      });

      setSectorFormated(sectorFormateded);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: IUser) => {
      const dataCreateUser = {
        userData: data,
        infoSectors: sectorSelected,
        infoModules: moduleSelected,
      };
      handleUser(dataCreateUser);
      setIsOpen();
    },
    [handleUser, moduleSelected, sectorSelected, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* {console.log(dataInitialSector)} */}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <span>
          <div>
            <h2>Adicionar novo usuário</h2>
            <FiPlus size={20} />
          </div>

          <FiX size={20} onClick={() => setIsOpen()} />
        </span>
        <header>
          <p>Nome do usuário</p>
          <Input name="name" placeholder="Ex: Cristiano Mattei" />

          <p>Nome de acesso</p>
          <Input
            name="nickname"
            type="text"
            placeholder="Ex: cristiano.mattei"
          />
        </header>

        <p>E-mail do usuário</p>
        <Input
          type="email"
          name="email"
          placeholder="Ex: antonio.fagundes@.empresa.com.br"
        />
        <p>Senha</p>
        <Input type="text" name="password" placeholder="Ex: senha123" />
        <p>Modelo de acesso</p>
        <Select name="tag" options={options} />
        <p>Setores para acesso</p>

        <MultiSelect
          options={sectorFormated}
          value={sectorSelected}
          onChange={setSectorSelected}
          labelledBy="Selecione"
          overrideStrings={Internationalization}
        />
        <p>Módulos</p>

        <MultiSelect
          options={modules}
          value={moduleSelected}
          onChange={setModuleSelected}
          labelledBy="Selecione"
          overrideStrings={Internationalization}
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

export default ModalAddSector;
