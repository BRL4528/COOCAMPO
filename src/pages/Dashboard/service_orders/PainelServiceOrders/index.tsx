/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { Form } from '@unform/web';

import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import OrderServiceTable from '../../../../components/Admin/OrderServiceTablePainel';
import Select from '../../../../components/Global/Select';
import Input from '../../../../components/Global/Input';
import Button from '../../../../components/Global/Button';

import ModallServicesOrders from '../../../../components/Admin/Modal/ModalServicesOrders';

import {
  handleSendEmailOpenOrderServiceAdm,
  handleSendEmailOpenOrderServiceUser,
} from '../../../../services/sendEmailOpenOrderService';

import { useAuth } from '../../../../hooks/auth';

import { CardeHeader, Container } from './styles';
import { api } from '../../../../services/api';

interface PropsItem {
  title?: string;
}

interface IdataTable {
  created_at: string;
  email: string;
  id: string;
  name: string;
  reason: string;
  status: string;
  updated_at: string;
  urgency: string;
  identification: number;
  observations: string;
  file: string;
  reason_observation: string;
}

interface IFilter {
  finishedDateIn: string;
  finishedDateOut: string;
  startDateIn: string;
  startDateOut: string;
  status: string;
  urgency: string;
}

const Reports: React.FC<PropsItem> = ({ title }) => {
  const { user, updateUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [toogleFilter, setToogleFilter] = useState(true);

  const [newServicesOrders, setNewServicesOrders] = useState<IdataTable>();

  const [dataFilter, setDataFilter] = useState<IFilter>({
    finishedDateIn: '',
    finishedDateOut: '',
    startDateIn: '',
    startDateOut: '',
    status: '',
    urgency: '',
  });

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleAnalytic = useCallback(
    async (servicesOrders: Omit<IdataTable, 'e'>) => {
      try {
        const temp = servicesOrders;
        setNewServicesOrders(temp);
        handleSendEmailOpenOrderServiceAdm(temp);
        handleSendEmailOpenOrderServiceUser(temp, user);
      } catch (err) {
        console.log(err);
      }
    },
    [user],
  );

  const handleFilter = useCallback((data: IFilter) => {
    setDataFilter(data);
  }, []);

  const handleToogleFilter = useCallback(() => {
    setToogleFilter(!toogleFilter);
  }, [toogleFilter]);

  const handleServiceAbsence = useCallback(async () => {
    if (user.status === 'Ausente') {
      const response = api.put('/accesses', {
        nickname: user.nickname,
        status: 'Presente',
      });
      updateUser((await response).data);
    } else if (user.status === 'Presente') {
      const response = api.put('/accesses', {
        nickname: user.nickname,
        status: 'Ausente',
      });
      updateUser((await response).data);
    }
  }, [updateUser, user.nickname, user.status]);

  return (
    <>
      <ModallServicesOrders
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAnalytic={handleAnalytic}
      />
      <Container toogleFilter={toogleFilter}>
        <CardeHeader titleItem={title}>
          <div>
            <h2>
              Ordens de servi??os
              <Link
                target="__black"
                to="/rules/sector-resume-rules?solicitacao-de-servico-para-ti"
              >
                {' '}
                <FiAlertCircle size={20} />{' '}
              </Link>
            </h2>
            <strong>Monitore a demanda de solicita??oes de servi??os</strong>
          </div>

          {/* <CardButton>
            <div>
              <Button isUsed onClick={toggleModal}>
                Nova ordem
              </Button>
            </div>
          </CardButton> */}
        </CardeHeader>

        <section className="section-filter">
          <header>
            <span>
              <Button isUsed type="button" onClick={handleToogleFilter}>
                <p>Filtro</p>
              </Button>
            </span>

            <span>
              <Button
                isUsed
                type="button"
                className={user.status}
                onClick={handleServiceAbsence}
              >
                <p>{user.status}</p>
              </Button>
            </span>
          </header>

          <Form onSubmit={handleFilter}>
            <section>
              <div>
                <fieldset>
                  <legend>Categoria</legend>

                  <p>Nivel de urgencia</p>

                  <Select
                    name="urgency"
                    options={[
                      {
                        label: 'Vazio',
                        value: '',
                      },
                      {
                        label: 'Baixo',
                        value: 'baixo',
                      },
                      {
                        label: 'M??dio',
                        value: 'medio',
                      },
                      {
                        label: 'Alto',
                        value: 'alto',
                      },
                    ]}
                  />
                  {/* <select>
                  <option>Baixo</option>
                  <option>M??dio</option>
                  <option>Alto</option>
                </select> */}

                  <p className="space-top">Status</p>
                  <Select
                    name="status"
                    options={[
                      {
                        label: 'Vazio',
                        value: '',
                      },
                      {
                        label: 'Pendente',
                        value: 'Pendente',
                      },
                      {
                        label: 'Finalizado',
                        value: 'Finalizado',
                      },
                      {
                        label: 'Andamento',
                        value: 'Andamento',
                      },
                    ]}
                  />
                </fieldset>
              </div>

              <fieldset>
                <legend>Data da solicita????o</legend>
                <div>
                  <p>Data inicial</p>
                  <Input type="date" name="startDateIn" />

                  <p className="space-top">Data final</p>
                  <Input type="date" name="startDateOut" />
                </div>
              </fieldset>

              <fieldset>
                <legend>Data de atendimento</legend>
                <div>
                  <p>Data inicial</p>
                  <Input type="date" name="finishedDateIn" />

                  <p className="space-top">Data final</p>
                  <Input type="date" name="finishedDateOut" />
                </div>
              </fieldset>
              <span>
                <button type="submit">Aplicar filtro</button>
              </span>
            </section>
          </Form>
        </section>
        <div className="section-body">
          <OrderServiceTable
            email={user.email}
            filterData={dataFilter}
            newServicesOrders={newServicesOrders}
          />
        </div>
      </Container>
    </>
  );
};

export default Reports;
