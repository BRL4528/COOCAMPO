/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { FiChevronRight } from 'react-icons/fi';

import api from '../../../services/api';

import { Container, CardeHeader, TableContainerList } from './styles';

interface IAnalyticModule {
  id: string;
  url?: string;
  name: string;
  responsible: string;
  condition: string;
  observations: string;
}

const SelectorFolders: React.FC = () => {
  const [dataAnalyticModule, setDataAnalyticModule] = useState<
    IAnalyticModule[]
  >([]);

  useEffect(() => {
    api.get('/analysis-module').then(response => {
      setDataAnalyticModule(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <CardeHeader>
          <div>
            <h2>Módulo de Análise</h2>
            <strong>Verifique as formas de inserção de dados manuais.</strong>
          </div>
        </CardeHeader>

        <TableContainerList>
          {dataAnalyticModule.map(analyticModule => (
            <span key={analyticModule.id}>
              <div>
                <strong>{analyticModule.name}</strong>
                <p>{analyticModule.observations}</p>
                <a href={analyticModule.url}>Painel módulo de ánalise</a>
              </div>

              <FiChevronRight size={20} />
            </span>
          ))}
        </TableContainerList>
      </Container>
    </>
  );
};

export default SelectorFolders;
