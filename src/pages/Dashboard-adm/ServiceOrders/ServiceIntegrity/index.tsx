/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { FcOk, FcHighPriority } from 'react-icons/fc';
import Button from '../../../../components/Global/Button';

import ModalUpdateServiceIntegrity from './ModalUpdateServiceIntegrity';

import {
  handleSendEmailOpenOrderServiceAdm,
  handleSendEmailOpenOrderServiceUser,
} from '../../../../services/sendEmailOpenOrderService';

import { useAuth } from '../../../../hooks/auth';

import { CardButton, CardeHeader, Container } from './styles';

interface PropsItem {
  title?: string;
}

interface IdataTable {
  created_at: string;
  email: string;
  id: string;
  name: string;
  observations: string;
  reason: string;
  status: string;
  updated_at: string;
  urgency: string;
}

const Reports: React.FC<PropsItem> = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleAnalytic = useCallback(
    async (servicesOrders: Omit<IdataTable, 'e'>) => {
      try {
        const temp = servicesOrders;
        // setServicesOrders(temp);
        handleSendEmailOpenOrderServiceAdm(temp);
        handleSendEmailOpenOrderServiceUser(temp, user);
      } catch (err) {
        console.log(err);
      }
    },
    [user],
  );

  return (
    <>
      <ModalUpdateServiceIntegrity
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAnalytic={handleAnalytic}
      />
      <CardeHeader>
        <div>
          <h2>Integridade dos serviços</h2>
          <strong>Acompanhe o status dos serviços da cooperativa</strong>
        </div>

        <CardButton>
          <div>
            <Button isUsed onClick={toggleModal}>
              Atualizar integridade
            </Button>
          </div>
        </CardButton>
      </CardeHeader>
      <Container>
        <div className="section-body">
          <h1>Nivel Global</h1>
          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Status</th>
                <th>Ultima atualização</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>
                    <strong>Rede de internet</strong>
                  </p>
                </td>
                <td>
                  <div>
                    <FcOk size={20} />
                    <p>Online</p>
                  </div>
                </td>
                <td>20/09/2021 - 16:32</td>
              </tr>
              <tr>
                <td>
                  <p>
                    <strong>Servidores</strong>
                  </p>
                </td>
                <td>
                  <div>
                    <FcHighPriority size={20} />
                    <p>Offline</p>
                  </div>
                </td>
                <td>20/09/2021 - 16:32</td>
              </tr>
              <tr>
                <td>
                  <p>
                    <strong>Gescooper</strong>
                  </p>
                </td>
                <td>
                  <div>
                    <FcOk size={20} />
                    <p>Online</p>
                  </div>
                </td>
                <td>20/09/2021 - 16:32</td>
              </tr>
              <tr>
                <td>
                  <p>
                    <strong>Sage</strong>
                  </p>
                </td>
                <td>
                  <div>
                    <FcOk size={20} />
                    <p>Online</p>
                  </div>
                </td>
                <td>20/09/2021 - 16:32</td>
              </tr>
              <tr>
                <td>
                  <p>
                    <strong>S2</strong>
                  </p>
                </td>
                <td>
                  <div>
                    <FcOk size={20} />
                    <p>Online</p>
                  </div>
                </td>
                <td>20/09/2021 - 16:32</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Reports;
