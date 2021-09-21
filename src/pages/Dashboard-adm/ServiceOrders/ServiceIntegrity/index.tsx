/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState, useEffect } from 'react';
import { FcOk, FcHighPriority } from 'react-icons/fc';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import Button from '../../../../components/Global/Button';

import ModalUpdateServiceIntegrity from './ModalUpdateServiceIntegrity';

import { CardButton, CardeHeader, Container } from './styles';
import { api } from '../../../../services/api';

interface IServices {
  id: string;
  service: string;
  status: string;
  level: string;
  created_at: string;
  updated_at: string;
}

const Reports: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataServices, setDataServices] = useState<IServices[]>();

  useEffect(() => {
    api.get('/services-integrity').then(response => {
      setDataServices(response.data);
    });
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleAnalytic = useCallback(
    async (servicesOrders: Omit<IServices, 'e'>) => {
      try {
        const temp = servicesOrders;
        console.log('dados para atualização', temp);
        // handleSendEmailOpenOrderServiceAdm(temp);
        // handleSendEmailOpenOrderServiceUser(temp, user);
      } catch (err) {
        console.log(err);
      }
    },
    [],
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
          <h1>Nivel Geral</h1>
          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Status</th>
                <th>Ultima atualização</th>
              </tr>
            </thead>

            <tbody>
              {dataServices?.map(service => (
                <tr>
                  <td>
                    <p>
                      <strong>{service.service}</strong>
                    </p>
                  </td>
                  <td>
                    <div>
                      {service.status === 'Online' ? (
                        <FcOk size={20} />
                      ) : (
                        <FcHighPriority size={20} />
                      )}

                      <p>{service.status}</p>
                    </div>
                  </td>
                  <td>
                    {format(
                      new Date(service.updated_at),
                      'dd/MM/yyyy - HH:mm:ss',
                      {
                        locale: ptBR,
                      },
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Reports;
