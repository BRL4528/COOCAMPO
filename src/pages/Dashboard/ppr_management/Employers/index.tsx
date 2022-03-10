import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, Flex, Button as ButtonChakra } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { FiUserPlus, FiKey } from 'react-icons/fi';
import { api } from '../../../../services/api';
import ModalCreateUser from './ModalCreateUser';

import { apllyToast } from '../../../../components/Global/Toast2.0';

import { CardButton, Container, CardeHeader } from './styles';

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

  const handleUser = useCallback((userInfo: Omit<IHandleUser, ''>) => {
    try {
      const { userData, infoModules, infoSectors } = userInfo;

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
        .then(res => {
          api
            .post('/accesses-of-sectors/create-all', {
              sectors: infoSectors,
              access_id: res.data.id,
            })
            .then(response => {
              console.log('resposta vinculo setor e usuario', response.data);
            });

          apllyToast('success', 'Sucesso ao criar novo usuario');
        });
    } catch (err) {
      console.log(err);
      apllyToast('error', 'Problemas ao criar novo usuario');
    }
  }, []);

  return (
    <>
      <Container>
        <CardeHeader>
          <div>
            <h2>Acessos</h2>
            <strong>Gererencie os acessos da aplicação</strong>
          </div>

          <CardButton>
            <ButtonChakra
              leftIcon={<FiUserPlus />}
              onClick={toggleModal}
              type="button"
              colorScheme="yellow"
              color="white"
            >
              Adicionar usuário
            </ButtonChakra>
            <div>
              <ButtonChakra
                leftIcon={<FiKey />}
                as={Link}
                to="/administrator/set-data-user"
                onClick={toggleModal}
                type="button"
                colorScheme="yellow"
                color="white"
              >
                Atualizar senha
              </ButtonChakra>
            </div>
          </CardButton>
        </CardeHeader>

        {dataAccess.map(users => (
          <Box
            key={users.id}
            bg="gray.800"
            p="10px"
            borderRadius="6px"
            mb="10px"
          >
            {/* <CardGraphicText>
              <GraphicTitle> */}

            <h2>{users.name}</h2>

            <Flex flexDirection="column">
              <Flex flexDirection="row" align="center">
                <Text fontWeight="medium" color="gray.650" mr="10px">
                  Usuário:
                </Text>
                <Text>{users.nickname}</Text>
              </Flex>
              <Flex flexDirection="row" align="center">
                <Text fontWeight="medium" color="gray.650" mr="10px">
                  E-mail:
                </Text>
                <Text>{users.email}</Text>
              </Flex>
            </Flex>
            {/* </GraphicTitle>
            </CardGraphicText> */}
          </Box>
        ))}
      </Container>
      <ModalCreateUser
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleUser={handleUser}
        // dataEditUser={dataEditUser}
      />
    </>
  );
};

export default UserManagement;
