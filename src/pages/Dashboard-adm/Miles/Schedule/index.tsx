import React, { useCallback, useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';

import { CardeHeader, Container, Info } from './styles';
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

const Reports: React.FC<PropsItem> = () => {
  const [dataVehicles, setDataVehicles] = useState<IVehicles[]>([]);

  const [favoriteVehicle, setFavoriteVehicle] = useState<IVehicles>();
  const [updateVehicleFavorite, setUpdateVehicleFavorite] =
    useState<IVehicles>();

  const [selectedVehicle, setSelectedVehicle] = useState<IVehicles>();

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
  }, [updateVehicleFavorite]);

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
      <Container>
        <CardeHeader>
          <div>
            <h2>Agenda</h2>
            <strong>
              Verifique a diponibilidade de um veiculo ou faça um novo
              agendamento
            </strong>
          </div>
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
      </Container>
    </>
  );
};

export default Reports;
