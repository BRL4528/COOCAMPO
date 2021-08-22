/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { Form } from '@unform/web';
import Button from '../../../../components/Global/Button';
import OrderServiceTable from '../../../../components/Admin/OrderServiceTablePainel';
import Select from '../../../../components/Global/Select';
import Input from '../../../../components/Global/Input';

import ModallServicesOrders from '../../../../components/Admin/Modal/ModalServicesOrders';

import {
  handleSendEmailOpenOrderServiceAdm,
  handleSendEmailOpenOrderServiceUser,
} from '../../../../services/sendEmailOpenOrderService';

import { useAuth } from '../../../../hooks/auth';

import { CardButton, CardeHeader, Container } from './styles';

interface PropsItem {
  title?: string;
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

  return (
    <>
      <ModallServicesOrders
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAnalytic={handleAnalytic}
      />
      <Container>
        <CardeHeader titleItem={title}>
          <div>
            <h2>Ordens de serviços</h2>
            <strong>Monitore a demanda de solicitaçoes de serviços</strong>
          </div>

          <CardButton>
            <div>
              <Button isUsed onClick={toggleModal}>
                Nova ordem
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        <section className="section-filter">
          <header>
            <p>Filtro</p>
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
                <button type="submit">Aplicar filtro</button>
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
