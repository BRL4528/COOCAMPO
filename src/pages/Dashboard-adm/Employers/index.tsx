import React, { useCallback, useEffect, useState } from 'react';

import Button from '../../../components/Global/Button';
import { api } from '../../../services/api';
import ModalCreateUser from './ModalCreateUser';

import {
  CardButton,
  Container,
  CardeHeader,
  CardGraphic,
  GraphicTitle,
  CardGraphicText,
} from './styles';

interface IUser {
  id?: string;
  name: string;
  nickname: string;
  password: string;
  tag: string;
  email: string;
  dashboard?: string;
  goals_and_sub_goals?: string;
  sector?: string;
  employers?: string;
  module_analyze?: string;
  imports?: string;
  report?: string;
  service_send_email?: string;
  schedule?: string;
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

const UserManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAccess, setDataAccess] = useState<IUser[]>([]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    api.get('/accesses').then(response => {
      setDataAccess(response.data);
    });
  }, []);

  const handleUser = useCallback((user: Omit<IHandleUser, ''>) => {
    try {
      const { userData, infoModules } = user;

      api
        .post('/accesses', {
          name: userData.name,
          email: userData.email,
          nickname: userData.nickname,
          password: userData.password,
          tag: userData.tag,
          dashboard: Boolean(infoModules.find(el => el.value === 'dashboard')),
          goals_and_sub_goals: Boolean(
            infoModules.find(el => el.value === 'goals_and_sub_goals'),
          ),
          sector: Boolean(infoModules.find(el => el.value === 'sector')),
          employers: Boolean(infoModules.find(el => el.value === 'employers')),
          module_analyze: Boolean(
            infoModules.find(el => el.value === 'module_analyze'),
          ),
          imports: Boolean(infoModules.find(el => el.value === 'imports')),
          report: Boolean(infoModules.find(el => el.value === 'report')),
          service_send_email: Boolean(
            infoModules.find(el => el.value === 'service_send_email'),
          ),
          schedule: Boolean(infoModules.find(el => el.value === 'schedule')),
        })
        .then(response => {
          console.log(response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <>
      <ModalCreateUser
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleUser={handleUser}
        // dataEditUser={dataEditUser}
      />

      <Container>
        <CardeHeader>
          <div>
            <h2>Acessos</h2>
            <strong>Gererencie os acessos da aplicação</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Adicionar novo usuário
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        {dataAccess.map(users => (
          <CardGraphic>
            <CardGraphicText>
              <GraphicTitle>
                <h3>{users.name}</h3>

                <p>
                  E-mail:
                  {users.email}
                </p>
              </GraphicTitle>
            </CardGraphicText>
          </CardGraphic>
        ))}
      </Container>
    </>
  );
};

export default UserManagement;
