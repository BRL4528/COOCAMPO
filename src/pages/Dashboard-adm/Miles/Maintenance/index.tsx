import React, { useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FiStar } from 'react-icons/fi';

import Button from '../../../../components/Global/Button';
import MaintenanceTable from '../../../../components/Admin/MaintenanceTable';
import Select from '../../../../components/Global/Select';
import Input from '../../../../components/Global/Input';

import ModalAddNewMaintenance from './ModalAddMaintenance';

import { useAuth } from '../../../../hooks/auth';

import { CardButton, CardeHeader, Container, Info } from './styles';
import { api } from '../../../../services/api';

interface IVehicles {
  id: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: number;
  image: string;
  document: string;
  observations: string;
  image_url: string;
  document_url: string;
}

interface PropsItem {
  title?: string;
}

interface IMaintenance {
  date: Date;
  km: number;
  reason: string;
  type: string;
  description: string;
  conductor: string;
  amount_total: number;
  observation: string;
}

interface IFilter {
  finishedDateIn: string;
  finishedDateOut: string;
  startDateIn: string;
  startDateOut: string;
  status: string;
  urgency: string;
}

const Maintenance: React.FC<PropsItem> = ({ title }) => {
  const { user } = useAuth();
  const [dataVehicles, setDataVehicles] = useState<IVehicles[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [favoriteVehicle, setFavoriteVehicle] = useState<IVehicles>();
  const [updateVehicleFavorite, setUpdateVehicleFavorite] =
    useState<IVehicles>();

  const [selectedVehicle, setSelectedVehicle] = useState<IVehicles>();

  const [toogleFilter, setToogleFilter] = useState(true);

  const [newRegister, setNewRegister] = useState<string>();

  // const [dataFilter, setDataFilter] = useState<IFilter>({
  //   finishedDateIn: '',
  //   finishedDateOut: '',
  //   startDateIn: '',
  //   startDateOut: '',
  //   status: '',
  //   urgency: '',
  // });

  useEffect(() => {
    const favoriteVehicleLocal = localStorage.getItem(
      '@Samasc:favoriteVehicle',
    );

    if (favoriteVehicleLocal) {
      setFavoriteVehicle(JSON.parse(favoriteVehicleLocal));
      setSelectedVehicle(JSON.parse(favoriteVehicleLocal));
    }

    api.get('/vehicles').then(response => {
      if (favoriteVehicleLocal) {
        const verifyVehicle = response.data.filter(
          (vehicle: { id: any }) =>
            vehicle.id === JSON.parse(favoriteVehicleLocal || '').id,
        )[0];

        if (JSON.stringify(verifyVehicle) !== favoriteVehicleLocal) {
          localStorage.setItem(
            '@Samasc:favoriteVehicle',
            JSON.stringify(verifyVehicle),
          );
        }
        setSelectedVehicle(verifyVehicle);
      }

      setDataVehicles(response.data);
    });
  }, [updateVehicleFavorite, newRegister]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleAddNewMaintenance = useCallback(
    async (data: Omit<IMaintenance, 'e'>, document) => {
      const {
        date,
        km,
        amount_total,
        conductor,
        description,
        reason,
        type,
        observation,
      } = data;

      const formatData = {
        date,
        km,
        amount_total,
        conductor,
        description,
        reason,
        type,
        observation,
        // vehicle_id: selectedVehicle?.id,
        // access_id: user.id,
      };

      await api.post('/maintenance', formatData).then(async response => {
        await api.patch(
          `/maintenance/upload/file?id=${response.data.id}`,
          document,
        );

        setNewRegister(response.data.id);
      });
    },
    [],
  );

  const handleFilter = useCallback((data: IFilter) => {
    // setDataFilter(data);
    console.log('talves filtrar por aq', data);
  }, []);

  const handleToogleFilter = useCallback(() => {
    setToogleFilter(!toogleFilter);
  }, [toogleFilter]);

  const handleSetFavorite = useCallback(
    (data: IVehicles) => {
      if (data.id !== favoriteVehicle?.id) {
        localStorage.setItem('@Samasc:favoriteVehicle', JSON.stringify(data));
        setUpdateVehicleFavorite(data);
      }
    },
    [favoriteVehicle?.id],
  );

  const handleSelectedVehicle = useCallback((data: IVehicles) => {
    setSelectedVehicle(data);
  }, []);

  return (
    <>
      <ModalAddNewMaintenance
        km_initial={{ km_start: selectedVehicle?.km || 0 }}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddNewMaintenance={handleAddNewMaintenance}
      />
      <Container toogleFilter={toogleFilter}>
        <CardeHeader titleItem={title}>
          <div>
            <h2>Manutenções</h2>
            <strong>Gerencie as manutenções de seu veículo</strong>
          </div>

          <CardButton>
            <div>
              <Button isUsed onClick={toggleModal}>
                Nova Manutenção
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        <h4>Veiculos disponiveis</h4>

        <section className="section-vehicle-available">
          {dataVehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className={selectedVehicle?.id === vehicle.id ? 'selected' : ''}
            >
              <button
                type="button"
                onClick={() => handleSelectedVehicle(vehicle)}
              >
                <div className="containerVehicle">
                  <img alt="carrro" src={vehicle.image_url} />
                  <section>
                    <p>
                      {vehicle.name} - placa {vehicle.plate}
                    </p>
                    <p>{vehicle.km} KM rodados até agora</p>
                  </section>
                </div>
              </button>
              <section
                className={favoriteVehicle?.id === vehicle.id ? 'favorite' : ''}
              >
                <Info title="Fixar como favorito">
                  <button
                    type="button"
                    onClick={() => handleSetFavorite(vehicle)}
                  >
                    <FiStar size={20} />
                  </button>
                </Info>
              </section>
            </div>
          ))}
        </section>

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
          <MaintenanceTable
            access_id={user.id}
            vehicle_id={selectedVehicle?.id || ''}
            newRegister={newRegister || ''}
          />
        </div>
      </Container>
    </>
  );
};

export default Maintenance;
