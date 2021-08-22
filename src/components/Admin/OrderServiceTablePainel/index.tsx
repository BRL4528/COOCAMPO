/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';

import ModalBoxItemTable from './ModalBoxItemTable';
import ModalFinishOrder from './ModalBoxItemFinishOrder';

import Button from '../../Global/Button';

import { api } from '../../../services/api';
import { Container, Section } from './styles';

import { useAuth } from '../../../hooks/auth';

interface IdataTable {
  // eslint-disable-next-line react/require-default-props
  email?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  filterData: {
    finishedDateIn: string;
    finishedDateOut: string;
    startDateIn: string;
    startDateOut: string;
    status: string;
    urgency: string;
  };
}

interface ITable {
  serviceOrder: [
    {
      created_at: string;
      email: string;
      id: string;
      name: string;
      observations: string;
      reason: string;
      status: string;
      updated_at: string;
      urgency: string;
      end_date: string;
    },
  ];
  pagination: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

const OrderServiceTable: React.FC<IdataTable> = ({
  email,
  filterData,
}: IdataTable) => {
  const { user } = useAuth();
  const [dataTable, setDataTable] = useState<ITable>();
  const [modalOpen, setModalOpen] = useState(false);

  const [idOpenModal, setIdOpenModal] = useState('nada');

  const [openModalFinishOrder, setOpenModalFinishOrder] = useState(false);
  const [idModalFinishOrder, setIdModalFinishOrder] = useState('nada');

  const [pagination, setPagination] = useState({
    page: 0,
  });

  useEffect(() => {
    api
      .get<ITable>(
        `/services-orders/filter?urgency=${filterData.urgency}&status=${filterData.status}&request_start_date=${filterData.startDateIn}&request_end_date=${filterData.startDateOut}&service_start_date=${filterData.finishedDateIn}&service_end_date=${filterData.finishedDateOut}&take=10&page=${pagination.page}`,
      )
      .then(resposnse => {
        setDataTable(resposnse.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, filterData, user.email, pagination]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const tggleIdModal = useCallback(
    id => {
      setIdOpenModal(id);
      setModalOpen(!modalOpen);
    },
    [modalOpen],
  );

  const setToggleModal = useCallback(() => {
    setIdOpenModal('');
  }, []);

  const handleFinishOrder = useCallback(
    id => {
      setOpenModalFinishOrder(!openModalFinishOrder);
      setIdModalFinishOrder(id);
    },
    [openModalFinishOrder],
  );

  const toggleModalFinishOrder = useCallback(() => {
    setOpenModalFinishOrder(!openModalFinishOrder);
  }, [openModalFinishOrder]);

  const setToggleModalFinishOrder = useCallback(() => {
    setIdModalFinishOrder('');
  }, []);

  const nextPage = useCallback(() => {
    const newPage = {
      page: (pagination.page += 1),
    };
    setPagination(newPage);
  }, [pagination]);

  const returnPage = useCallback(() => {
    const newPage = {
      page: pagination.page - 1,
    };
    setPagination(newPage);
  }, [pagination]);

  return (
    <>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Identificação</th>
              <th>Urgência</th>
              <th>Motivo</th>
              <th>Status</th>
              <th>Data solicitação</th>
              <th>Data atendimento</th>
              <th>Visualizar</th>
              <th>Ação</th>
            </tr>
          </thead>

          <tbody>
            {dataTable?.serviceOrder.map(item => (
              <tr key={item.id}>
                <td>{parseInt(item.id || 'x', 16)}</td>
                <td className={item.urgency}>
                  <p>{item.urgency}</p>
                </td>
                <td>
                  <div>{item.reason}</div>
                </td>
                <td>
                  {item.status === 'Pendente' ? (
                    <span className={item.status}>
                      <p>{item.status}</p>
                      <FiClock size={20} />
                    </span>
                  ) : (
                    <span className={item.status}>
                      <p>{item.status}</p>
                      <FiCheckCircle size={20} />
                    </span>
                  )}
                </td>
                <td>
                  {format(new Date(item.created_at), 'dd/MM/yyyy - HH:mm:ss', {
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {item.end_date === null
                    ? 'Status pendente'
                    : format(new Date(item.end_date), 'dd/MM/yyyy - HH:mm:ss', {
                        locale: ptBR,
                      })}
                </td>
                <td>
                  <Button onClick={() => tggleIdModal(item.id)}>Abrir</Button>
                </td>
                <td>
                  {item.end_date === null ? (
                    <Button onClick={() => handleFinishOrder(item.id)}>
                      Finalizar
                    </Button>
                  ) : (
                    'Orden finalizada'
                  )}
                </td>

                <ModalBoxItemTable
                  id={item.id}
                  isDataId={idOpenModal}
                  isOpen={modalOpen}
                  setIsOpen={toggleModal}
                  setToggleModal={setToggleModal}
                />
                <ModalFinishOrder
                  id={item.id}
                  isDataId={idModalFinishOrder}
                  isOpen={openModalFinishOrder}
                  setIsOpen={toggleModalFinishOrder}
                  setToggleModal={setToggleModalFinishOrder}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <Section>
        <div>
          <button
            disabled={pagination.page === 0}
            type="button"
            onClick={returnPage}
          >
            Anterior
          </button>
          <strong>{pagination.page}</strong>
          <button
            disabled={pagination.page === dataTable?.pagination.totalPages}
            type="button"
            onClick={nextPage}
          >
            Proximo
          </button>
        </div>
      </Section>
    </>
  );
};

export default OrderServiceTable;
