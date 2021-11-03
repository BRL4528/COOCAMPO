/* eslint-disable no-multi-assign */
import React, { useCallback, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import { useLoading, Oval } from '@agney/react-loading';
import ModalBoxItemTable from './ModalBoxItemTable';

import { api } from '../../../services/api';
import { Container } from './styles';

interface IdataTable {
  newRegister: string;
  access_id: string;
  vehicle_id: string;
}
interface IKilometers {
  // vehicle_id?: string;
  // access_id?: string;
  kilometer: [
    {
      id: string;
      km_start: number;
      km_end: number;
      km_traveled: number;
      observations: string;
      reason: string;
      created_at: string;
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
  access_id,
  vehicle_id,
  newRegister,
}: IdataTable) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [dataTable, setDataTable] = useState<IKilometers>();
  const [modalOpen, setModalOpen] = useState(false);

  const [idOpenModal, setIdOpenModal] = useState('nada');

  const [loading, setLoading] = useState(false);

  // const [pagination, setPagination] = useState({
  //   page: 0,
  // });

  useEffect(() => {
    setLoading(true);
    api
      .get<IKilometers>(
        `/kilometers/filter?access_id=${access_id}&vehicle_id=${vehicle_id}&take=6&page=1`,
      )
      .then(response => {
        setDataTable(response.data);
        setLoading(false);
      });
  }, [access_id, vehicle_id, newRegister]);

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

  // const nextPage = useCallback(() => {
  //   const newPage = {
  //     page: (pagination.page += 1),
  //   };
  //   setPagination(newPage);
  // }, [pagination]);

  // const returnPage = useCallback(() => {
  //   const newPage = {
  //     page: pagination.page - 1,
  //   };
  //   setPagination(newPage);
  // }, [pagination]);

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval />,
  });

  return (
    <>
      <Container>
        {loading ? (
          <div {...containerProps} ref={componentRef}>
            {indicatorEl}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>KM Inicial</th>
                <th>KM Final</th>
                <th>KM percorrido</th>
                <th>Destino</th>
                <th>Motivo</th>
              </tr>
            </thead>

            <tbody>
              <>
                {dataTable?.kilometer !== undefined &&
                dataTable?.kilometer.length > 0 ? (
                  <>
                    {dataTable?.kilometer.map(item => (
                      <tr key={item.id} onClick={() => tggleIdModal(item.id)}>
                        <td>
                          {format(
                            new Date(item.created_at),
                            'dd/MM/yyyy - HH:mm:ss',
                            {
                              locale: ptBR,
                            },
                          )}
                        </td>

                        <td>{item.km_start}</td>
                        <td>{item.km_end}</td>
                        <td>{item.km_traveled}</td>
                        <td>{item.observations}</td>
                        <td>{item.reason}</td>

                        <ModalBoxItemTable
                          id={item.id}
                          isDataId={idOpenModal}
                          isOpen={modalOpen}
                          setIsOpen={toggleModal}
                          setToggleModal={setToggleModal}
                        />
                      </tr>
                    ))}
                  </>
                ) : (
                  <div>
                    <p>Você não possui quilometragens com este veículo</p>
                  </div>
                )}
              </>
            </tbody>
          </table>
        )}
      </Container>
      {/* <Section>
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
      </Section> */}
    </>
  );
};

export default OrderServiceTable;
