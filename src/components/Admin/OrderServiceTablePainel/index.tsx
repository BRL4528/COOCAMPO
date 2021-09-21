/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';

import { FormHandles } from '@unform/core';

import { toast } from 'react-toastify';
import ModalBoxItemTable from './ModalBoxItemTable';
import ModalFinishOrder from './ModalBoxItemFinishOrder';

import Button from '../../Global/Button';

import { api } from '../../../services/api';
import { Container, Section, TagStatus } from './styles';

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

interface IDataOrderServices {
  id: string;
  name: string;
  urgency: string;
  reason: string;
  email: string;
  status?: string;
  observations: string;
  end_date: string;
  created_at: string;
}

const OrderServiceTable: React.FC<IdataTable> = ({
  email,
  filterData,
}: IdataTable) => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [dataTable, setDataTable] = useState<ITable>();
  const [modalOpen, setModalOpen] = useState(false);

  const [idOpenModal, setIdOpenModal] = useState('nada');

  const [openModalFinishOrder, setOpenModalFinishOrder] = useState(false);
  const [idModalFinishOrder, setIdModalFinishOrder] = useState('nada');

  const [pagination, setPagination] = useState({
    page: 0,
  });

  const [returnDataFinsh, setReturnDataFinsh] = useState<IDataOrderServices>();

  useEffect(() => {
    api
      .get<ITable>(
        `/services-orders/filter?urgency=${filterData.urgency}&status=${filterData.status}&request_start_date=${filterData.startDateIn}&request_end_date=${filterData.startDateOut}&service_start_date=${filterData.finishedDateIn}&service_end_date=${filterData.finishedDateOut}&take=10&page=${pagination.page}`,
      )
      .then(resposnse => {
        setDataTable(resposnse.data);
      });
  }, [email, filterData, user.email, pagination, returnDataFinsh]);

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

  const handleReturnFinishOrder = useCallback(
    (finishOrder: Omit<IDataOrderServices, 'status'>) => {
      try {
        const temp = finishOrder;
        setReturnDataFinsh(temp);
        console.log('Finished', temp);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  const handleAddOrderInStage = useCallback(
    async id => {
      try {
        // setLoading(true);

        formRef.current?.setErrors({});

        const status = 'Andamento';

        const formData = {
          status,
        };

        api.put(`/services-orders?id=${id}`, formData).then(response => {
          handleReturnFinishOrder(response.data);
          toast.success('OS em atendimento', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });

        // setLoading(false);
      } catch (err) {
        console.log('ver esso', err);
        toast.warning('problemas ao atender OS', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setLoading(false);
      }
    },
    [handleReturnFinishOrder],
  );

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
                  <TagStatus disabled={item.status === 'Pendente'}>
                    <span className={item.status}>
                      <p>{item.status}</p>
                      <FiClock size={20} />
                    </span>
                  </TagStatus>

                  <TagStatus disabled={item.status === 'Finalizado'}>
                    <span className={item.status}>
                      <p>{item.status}</p>
                      <FiCheckCircle size={20} />
                    </span>
                  </TagStatus>

                  <TagStatus disabled={item.status === 'Andamento'}>
                    <span className={item.status}>
                      <p>{item.status}</p>
                      <FiAlertCircle size={20} />
                    </span>
                  </TagStatus>
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
                  <Button isUsed onClick={() => tggleIdModal(item.id)}>
                    Abrir
                  </Button>
                </td>
                <td>
                  {item.end_date === null ? (
                    // <Button isUsed onClick={() => handleFinishOrder(item.id)}>
                    //   Finalizar
                    // </Button>
                    <section>
                      <Menu
                        menuButton={<MenuButton>Opções</MenuButton>}
                        className="my-menu"
                      >
                        {item.status === 'Andamento' ? (
                          ''
                        ) : (
                          <MenuItem
                            onClick={() => handleAddOrderInStage(item.id)}
                          >
                            Atender
                          </MenuItem>
                        )}
                        <MenuItem onClick={() => handleFinishOrder(item.id)}>
                          Finalizar
                        </MenuItem>
                      </Menu>
                    </section>
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
                  handleReturnFinishOrder={handleReturnFinishOrder}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <Section>
        <div>
          <body>
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
          </body>
          <footer>
            <strong>total de registros:</strong>
            <strong>{dataTable?.pagination.total}</strong>
          </footer>
          <footer>
            <strong>total de paginas:</strong>
            <strong>{dataTable?.pagination.totalPages}</strong>
          </footer>
        </div>
      </Section>
    </>
  );
};

export default OrderServiceTable;
