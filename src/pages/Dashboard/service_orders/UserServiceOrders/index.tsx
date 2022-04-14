/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle';
import { FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Global/Button';
import OrderServiceTable from '../../../../components/Admin/OrderServiceTable';
import Select from '../../../../components/Global/Select';
import Input from '../../../../components/Global/Input';

import ModallServicesOrders from '../../../../components/Admin/Modal/ModalServicesOrders';

import {
  handleSendEmailOpenOrderServiceAdm,
  handleSendEmailOpenOrderServiceUser,
} from '../../../../services/sendEmailOpenOrderService';

import { useAuth } from '../../../../hooks/auth';

import { CardButton, CardeHeader, Container, CardInfo } from './styles';
import { api } from '../../../../services/api';

interface PropsItem {
  title?: string;
}

interface Iuser {
  access: {
    id: string;
    name: string;
    nickname: string;
    status: string;
    tag: string;
    email: string;
    dashboard: boolean;
    goals_and_sub_goals: boolean;
    sector: boolean;
    employers: boolean;
    module_analyze: boolean;
    imports: boolean;
    report: boolean;
    service_send_email: boolean;
    schedule: boolean;
  };
}

interface IdataTable {
  created_at: string;
  email: string;
  id: string;
  name: string;
  observations: string;
  reason: string;
  status: string;
  updated_at: string;
  urgency: string;
  identification: number;
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
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [toogleFilter, setToogleFilter] = useState(true);

  const [dataFilter, setDataFilter] = useState<IFilter>({
    finishedDateIn: '',
    finishedDateOut: '',
    startDateIn: '',
    startDateOut: '',
    status: '',
    urgency: '',
  });

  const [textStatusServices, setTextStatusServices] = useState('Carregando...');
  const [statusServices, setStatusServices] = useState('loading');

  useEffect(() => {
    api
      .get<IdataTable[]>('/services-orders')
      .then(async (response: { data: any[] }) => {
        const { status } = (
          await api.get<Iuser>('/accesses/58231ccb-5a12-42cb-ab1a-11ce837dff3b')
        ).data.access;

        if (status === 'Presente') {
          const servicesFiltred = response.data.filter(
            item => item.status === 'Andamento',
          );
          if (servicesFiltred.length > 0) {
            setTextStatusServices(
              `Técnico em TI esta em ${servicesFiltred.length} ${
                servicesFiltred.length > 1 ? 'Atendimentos' : 'Atendimento'
              } no momento`,
            );
            setStatusServices('info');
          } else if (servicesFiltred.length <= 0) {
            setTextStatusServices('Técnico em TI está aguardando novas OS');
            setStatusServices('success');
          }
        } else {
          setTextStatusServices('Técnico em TI está ausente no momento');
          setStatusServices('waring');
        }
      });
  }, [user]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleAnalytic = useCallback(
    async (servicesOrders: Omit<IdataTable, 'e'>) => {
      try {
        const temp = servicesOrders;
        // setServicesOrders(temp);
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
              Ordens de serviços{' '}
              <Link
                target="__black"
                to="/rules/sector-resume-rules?solicitacao-de-servico-para-ti"
              >
                {' '}
                <FiAlertCircle size={20} />{' '}
              </Link>
            </h2>
            <strong>Abra novos chamados de serviços</strong>
          </div>

          <CardButton>
            <div>
              <Button isUsed onClick={toggleModal}>
                Nova ordem
              </Button>
            </div>
          </CardButton>
        </CardeHeader>
        <CardInfo>
          <div className={statusServices}>
            <span>
              <UseAnimations
                animation={alertCircle}
                size={40}
                strokeColor="#ddca20"
                style={{ padding: 50 }}
              />
              <header>
                <h4>Status para atendimento</h4>
                <strong>{textStatusServices}</strong>
              </header>
            </span>
          </div>
        </CardInfo>
        <section className="section-filter">
          <header>
            <Button isUsed type="button" onClick={handleToogleFilter}>
              <p>Filtro</p>
            </Button>
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
                        label: 'Médio',
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
                  <option>Médio</option>
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
                    ]}
                  />
                </fieldset>
              </div>

              <fieldset>
                <legend>Data da solicitação</legend>
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
                <Button isUsed type="submit">
                  Aplicar filtro
                </Button>
              </span>
            </section>
          </Form>
        </section>
        <div className="section-body">
          <OrderServiceTable email={user.email} filterData={dataFilter} />
        </div>
      </Container>
    </>
  );
};

export default Reports;
