/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';

import { FiEdit } from 'react-icons/fi';
import { apllyToast } from '../../Global/Toast2.0';

import ModalEditVehicle from '../../../pages/Dashboard/vehicles_management/Vehicles/ModalEditVehicle';

// import ModalBoxItemTable from './ModalBoxItemTable';

import { api } from '../../../services/api';
import { Container } from './styles';

interface IdataTable {
  newVehicle: string;

  // filterData: {
  //   finishedDateIn: string;
  //   finishedDateOut: string;
  //   startDateIn: string;
  //   startDateOut: string;
  //   status: string;
  //   urgency: string;
  // };
}

// interface ITable {
//   vehicles: [
//     {
//       id: string;
//       name: string;
//       plate: string;
//       year: string;
//       fuel: string;
//       km: string;
//       image: string;
//       document: string;
//       observations: string;
//       image_url: string;
//       document_url: string;
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

interface ITable2 {
  id: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: string;
  image: string;
  document: string;
  observations: string;
  image_url: string;
  document_url: string;
  created_at: string;
}

interface IVehicles {
  id: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: string;
  observations: string;
}

// interface IDataOrderServices {
//  id: string;
//  name: string;
//  urgency: string;
//  reason: string;
//  email: string;
//  status?: string;
//  observations: string;
//  end_date: string;
//  created_at: string;
// }

const TableVehicles: React.FC<IdataTable> = () => {
  const [dataTable, setDataTable] = useState<ITable2[]>([]);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [dataEditVehicle, setDataEditVehicle] = useState('');
  const [newVehicle, setNewVehicle] = useState('');
  // const [modalOpen, setModalOpen] = useState(false);

  // const [idOpenModal, setIdOpenModal] = useState('nada');

  // const [pagination, setPagination] = useState({
  //   page: 0,
  // });

  useEffect(() => {
    api.get('/vehicles').then(response => {
      setDataTable(response.data);
    });
  }, [newVehicle]);

  const handleEditVehicle = useCallback(
    (vehiclesInfo: Omit<IVehicles, ''>, id: string) => {
      try {
        api.put(`/vehicles?id=${id}`, vehiclesInfo).then(response => {
          setNewVehicle(response.data);
        });
        apllyToast('success', 'Sucesso ao atualizar veículo!');
      } catch (err) {
        apllyToast('warning', 'Problemas ao atualizar veículo!');
      }
    },
    [],
  );

  const handleEdit = useCallback((idVehicle: string) => {
    setModalEditOpen(true);
    setDataEditVehicle(idVehicle);
  }, []);

  const toggleModalEdit = useCallback(() => {
    setModalEditOpen(!modalEditOpen);
  }, [modalEditOpen]);

  // const toggleModal = useCallback(() => {
  //   setModalOpen(!modalOpen);
  // }, [modalOpen]);

  // const tggleIdModal = useCallback(
  //   id => {
  //     setIdOpenModal(id);
  //     setModalOpen(!modalOpen);
  //   },
  //   [modalOpen],
  // );

  // const setToggleModal = useCallback(() => {
  //   setIdOpenModal('');
  // }, []);

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

  return (
    <>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Veículo</th>
              <th>Nome</th>
              <th>Placa</th>
              <th>Combus.</th>
              <th>Ano</th>
              <th>Km</th>
              <th>Documento</th>
              <th>Data de cadastro</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {dataTable?.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image_url} alt="Imagem do veiculo" />
                </td>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.plate}</p>
                </td>
                <td>
                  <p>{item.fuel}</p>
                </td>
                <td>
                  <p>{item.year}</p>
                </td>
                <td>
                  <p>{item.km}</p>
                </td>
                <td>
                  <a href={item.document_url} target="_blank">
                    Arquivo
                  </a>
                </td>
                <td>
                  {format(new Date(item.created_at), 'dd/MM/yyyy - HH:mm:ss', {
                    locale: ptBR,
                  })}
                </td>
                <td>
                  <FiEdit size={20} onClick={() => handleEdit(item.id)} />
                </td>

                {/* <ModalBoxItemTable
                  id={item.id}
                  isDataId={idOpenModal}
                  isOpen={modalOpen}
                  setIsOpen={toggleModal}
                  setToggleModal={setToggleModal}
                /> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <ModalEditVehicle
        isOpen={modalEditOpen}
        setIsOpen={toggleModalEdit}
        handleVehicle={handleEditVehicle}
        dataEditVehicle={dataEditVehicle}
      />
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

export default TableVehicles;
