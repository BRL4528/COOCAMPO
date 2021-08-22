import React, { useCallback, useEffect, useState } from 'react';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';

import ModalBoxItemTable from './ModalBoxItemTable';

import { api } from '../../../services/api';
import { Container } from './styles';

import { useAuth } from '../../../hooks/auth';

interface IdataTable {
  // eslint-disable-next-line react/require-default-props
  email?: string;
}

interface ITable {
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
}

const OrderServiceTable: React.FC<IdataTable> = ({ email }: IdataTable) => {
  const { user } = useAuth();
  const [dataTable, setDataTable] = useState<ITable[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [idOpenModal, setIdOpenModal] = useState('nada');

  useEffect(() => {
    api
      .get<ITable[]>(`/services-orders/show?email=${user.email}`)
      .then(resposnse => {
        setDataTable(resposnse.data);
      });
  }, [email, user.email]);

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
            </tr>
          </thead>

          <tbody>
            {dataTable.map(serviceOrder => (
              <tr
                key={serviceOrder.id}
                onClick={() => tggleIdModal(serviceOrder.id)}
              >
                <td>{parseInt(serviceOrder.id || 'x', 16)}</td>
                <td className={serviceOrder.urgency}>
                  <p>{serviceOrder.urgency}</p>
                </td>
                <td>
                  <div>{serviceOrder.reason}</div>
                </td>
                <td>
                  {serviceOrder.status === 'Pendente' ? (
                    <span className={serviceOrder.status}>
                      <p>{serviceOrder.status}</p>
                      <FiClock size={20} />
                    </span>
                  ) : (
                    <span className={serviceOrder.status}>
                      <p>{serviceOrder.status}</p>
                      <FiCheckCircle size={20} />
                    </span>
                  )}
                </td>
                <td>
                  {format(
                    new Date(serviceOrder.created_at),
                    'dd/MM/yyyy - HH:mm:ss',
                    {
                      locale: ptBR,
                    },
                  )}
                </td>
                <td>
                  {serviceOrder.end_date === null
                    ? 'Status pendente'
                    : format(
                        new Date(serviceOrder.end_date),
                        'dd/MM/yyyy - HH:mm:ss',
                        {
                          locale: ptBR,
                        },
                      )}
                </td>
                <ModalBoxItemTable
                  id={serviceOrder.id}
                  isDataId={idOpenModal}
                  isOpen={modalOpen}
                  setIsOpen={toggleModal}
                  setToggleModal={setToggleModal}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default OrderServiceTable;
