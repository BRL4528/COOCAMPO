import React, { useCallback, useState } from 'react';
import TableVehicles from '../../../components/Admin/TableVehicles';
import Button from '../../../components/Global/Button';
import { apllyToast } from '../../../components/Global/Toast2.0/index';
import { api } from '../../../services/api';
import ModalCreateVehicle from './ModalCreateVehicle';

import { CardButton, Container, CardeHeader } from './styles';

interface IVehicles {
  id: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: string;
  observations: string;
}

const UserManagement: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [newVehicle, setNewVehicle] = useState('');

  const handleAddVehicle = useCallback((vehiclesInfo: Omit<IVehicles, ''>) => {
    try {
      api.post('/vehicles', vehiclesInfo).then(response => {
        setNewVehicle(response.data);
      });

      apllyToast('success', 'Sucesso ao adicionar novo veículo!');
    } catch (err) {
      apllyToast('warning', 'Problemas ao adicionar novo veículo!');
    }
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

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

        <TableVehicles newVehicle={newVehicle} />
      </Container>
      <ModalCreateVehicle
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleVehicle={handleAddVehicle}
      />
    </>
  );
};

export default UserManagement;
