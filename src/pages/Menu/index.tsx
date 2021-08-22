import React from 'react';

import { Link } from 'react-router-dom';
import { ContainerCard, Content } from './styles';

import destin from '../../assets/destin.svg';
import pie from '../../assets/pie.svg';
import os from '../../assets/os.svg';
import fluxo from '../../assets/fluxo.svg';
import adm from '../../assets/adm.svg';

const Menu: React.FC = () => {
  return (
    <ContainerCard>
      <Link to="/#">
        <Content>
          <img src={destin} alt="imagem de destino" />
          <strong>Controle de frota</strong>
        </Content>
      </Link>

      <Link to="/management-ppr/dashboard">
        <Content>
          <img src={pie} alt="imagem de grafico pizza" />
          <strong>Gerenciamento PPR</strong>
        </Content>
      </Link>

      <Link to="/service-orders/user">
        <Content>
          <img src={os} alt="imagem de ordem de serviço" />
          <strong>Ordens de serviço</strong>
        </Content>
      </Link>

      <Link to="/dashboard">
        <Content>
          <img src={fluxo} alt="imagem de fluxo grama" />
          <strong>Normas interna</strong>
        </Content>
      </Link>

      <Link to="/administrator/employers">
        <Content>
          <img src={adm} alt="imagem de administrador" />
          <strong>Administrador</strong>
        </Content>
      </Link>
    </ContainerCard>
  );
};

export default Menu;
