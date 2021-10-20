import React, { useCallback, useState, useEffect } from 'react';
import { FiClock, FiStar } from 'react-icons/fi';

import DayPicker from 'react-day-picker';

import {
  CardeHeader,
  Container,
  Info,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
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

        <Content>
          <Schedule>
            <h2>Horário agendados</h2>

            <p>
              {/* {isToday(selectedDate) && <span>Hoje</span>}
            <span>Hoje</span> */}
              <span>Dia 06 </span>
              <span>Segunda-feira</span>
            </p>
            {/* {isToday(selectedDate) && nextAppointments && ( */}
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  alt="doido"
                />

                <strong>Ricardo Pereira</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>
            {/* )} */}

            <Section>
              <strong>Manhã</strong>
              {/* {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )} */}

              {/* {morningAppointments.map(appointment => ( */}
              <Appointment>
                <span>
                  <FiClock />
                  08:30
                </span>

                <div>
                  <img
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt="doido"
                  />

                  <strong>Ricardo Pereira</strong>
                </div>
              </Appointment>
              {/* ))} */}
            </Section>

            <Section>
              <strong>Tarde</strong>
              {/* {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )} */}
              {/* {afternoonAppointments.map(appointment => ( */}
              <Appointment>
                <span>
                  <FiClock />
                  09:00
                </span>

                <div>
                  <img
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt="doido"
                  />

                  <strong>Ricardo Pereira</strong>
                </div>
              </Appointment>
              {/* ))} */}
            </Section>
          </Schedule>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
            />
          </Calendar>
        </Content>
      </Container>
    </>
  );
};

export default Reports;
