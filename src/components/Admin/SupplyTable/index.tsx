/* eslint-disable no-multi-assign */
import React, { useCallback, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-duplicates
// import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
// import ptBR from 'date-fns/locale/pt-BR';
import { useLoading, Oval } from '@agney/react-loading';
import ModalBoxItemTable from './ModalBoxItemTable';

import { formatPrice } from '../../../utils/format';

import { api } from '../../../services/api';
import { Container } from './styles';

interface IdataTable {
  newRegister: string;
  access_id: string;
  vehicle_id: string;
}
// interface IKilometers {
//   // vehicle_id?: string;
//   // access_id?: string;
//   kilometer: [
//     {
//       id: string;
//       km_start: number;
//       km_end: number;
//       km_traveled: number;
//       observations: string;
//       reason: string;
//       created_at: string;
//     },
//   ];
//   pagination: {
//     page: number;
//     take: number;
//     total: number;
//     totalPages: number;
//   };
// }

interface Itemp {
  id: string;
  date: string;
  km_odometer: number;
  type: string;
  conductor: string;
  amount_total: number;
  observation: string;
  created_at: string;
}

const SupplyTable: React.FC<IdataTable> = ({
  access_id,
  vehicle_id,
  newRegister,
}: IdataTable) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [dataTable, setDataTable] = useState<Itemp[]>();
  const [modalOpen, setModalOpen] = useState(false);

  const [idOpenModal, setIdOpenModal] = useState('nada');

  const [loading, setLoading] = useState(false);

  // const [pagination, setPagination] = useState({
  //   page: 0,
  // });

  useEffect(() => {
    setLoading(true);
    api.get<Itemp[]>(`supplies`).then(response => {
      setDataTable(response.data);
      console.log('Manutenções', response.data);
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

  const formatValue = useCallback((value: number | bigint) => {
    return formatPrice(value);
  }, []);

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
                <th>Quilometragem</th>
                <th>Tipo</th>
                <th>Condutor</th>
                <th>Custo total</th>
                <th>Observação</th>
              </tr>
            </thead>

            <tbody>
              <>
                {/* {dataTable?.kilometer !== undefined &&
                dataTable?.kilometer.length > 0 ? ( */}
                <>
                  {dataTable?.map(item => (
                    <tr key={item.id} onClick={() => tggleIdModal(item.id)}>
                      <td>
                        {item.date}
                        {/* {new Date(item.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })} */}
                        {/* {format(new Date(item.date), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })} */}
                      </td>

                      <td>{item.km_odometer}</td>
                      <td>{item.type}</td>
                      <td>{item.conductor}</td>
                      <td>{formatValue(item.amount_total)}</td>
                      <td>{item.observation}</td>

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
                {/* ) : (
                  <div>
                    <p>Você não possui quilometragens com este veículo</p>
                  </div>
                )} */}
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

export default SupplyTable;
