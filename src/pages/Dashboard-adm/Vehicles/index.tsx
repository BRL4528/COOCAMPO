import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../components/Global/Button';
import { api } from '../../../services/api';
import ModalCreateVehicle from './ModalCreateVehicle';

import {
  CardButton,
  Container,
  CardeHeader,
  CardGraphic,
  GraphicTitle,
  CardGraphicText,
} from './styles';

interface IVehicles {
  id?: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: string;
  observations: string;
}

const UserManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataVehicles, setDataVehicles] = useState<IVehicles[]>([]);
  const [newVehicle, setNewVehicle] = useState('');

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    api.get('/vehicles').then(response => {
      setDataVehicles(response.data);
    });
  }, [newVehicle]);

  const handleVehicle = useCallback((vehiclesInfo: Omit<IVehicles, ''>) => {
    try {
      api.post('/vehicles', vehiclesInfo).then(response => {
        setNewVehicle(response.data);
      });

      toast('Sucesso ao adicionar novo veículo!', {
        position: 'bottom-right',
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast('Problemas ao adicionar novo veículo!', {
        position: 'bottom-right',
        autoClose: 5000,
        type: 'warning',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  return (
    <>
      <Container>
        <CardeHeader>
          <div>
            <h2>Veículos</h2>
            <strong>Gererencie os veículos de sua empresa</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Adicionar novo veículo
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        {dataVehicles.map(vehicles => (
          <CardGraphic key={vehicles.id}>
            <CardGraphicText>
              <GraphicTitle>
                <h3>{vehicles.name}</h3>

                <p>
                  Placa:
                  {vehicles.plate}
                </p>
              </GraphicTitle>
            </CardGraphicText>
          </CardGraphic>
        ))}
      </Container>
      <ModalCreateVehicle
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleVehicle={handleVehicle}
        // dataEditUser={dataEditUser}
      />
    </>
  );
};

export default UserManagement;
