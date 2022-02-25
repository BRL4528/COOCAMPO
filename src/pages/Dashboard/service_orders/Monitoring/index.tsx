import React from 'react';

import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

import { ReportConectBI } from '../../../../components/Admin/Reports/ReportConectBI/dashboard';

import { CardeHeader, Container } from './styles';

const Reports: React.FC = () => {
  return (
    <>
      <CardeHeader>
        <div>
          <h2>
            Monitoramento de Ordens de Serviços
            <Link
              target="__black"
              to="/rules/sector-resume-rules?solicitacao-de-servico-para-ti"
            >
              {' '}
              <FiAlertCircle size={20} />{' '}
            </Link>
          </h2>
          <strong>
            Acompanhe em tempo real as ordens de serviços da cooperativa
          </strong>
        </div>
      </CardeHeader>
      <Container>
        <ReportConectBI />
      </Container>
    </>
  );
};

export default Reports;
