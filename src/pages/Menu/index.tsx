/* eslint-disable no-constant-condition */
/* eslint-disable react/style-prop-object */
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { useAuth } from '../../hooks/auth';

import { ContainerCard, Content } from './styles';

import destin from '../../assets/destin.svg';
import pie from '../../assets/pie.svg';
import os from '../../assets/os.svg';
import fluxo from '../../assets/fluxo.svg';
import adm from '../../assets/adm.svg';
import { SetToggleThemeContext } from '../../contexts/SetToggleThemeContext';

const Menu: React.FC = () => {
  const { user } = useAuth();
  const { toggleTheme } = useContext(SetToggleThemeContext);

  return (
    <ContainerCard theme={toggleTheme}>
      <SimpleGrid
        columns={[2, 5]}
        // flex="1"
        spacing={3}
        // minWidth={['400', '0']}
        // align="center"
        // direction="row"
      >
        <Box className={user.tag === 'admin' ? '' : 'disabled'}>
          <Link to="/miles/dashboard">
            <Content>
              <img src={destin} alt="imagem de destino" />
              <strong>Controle de frota</strong>
            </Content>
          </Link>
        </Box>

        <Box>
          <Link to="/management-ppr/dashboard">
            <Content>
              <img src={pie} alt="imagem de grafico pizza" />
              <strong>Gerenciamento PPR</strong>
            </Content>
          </Link>
        </Box>

        {/* <div className={user.tag === 'admin' ? '' : 'disabled'}> */}
        <Box>
          <Link to="/service-orders/service-integrity">
            <Content>
              <img src={os} alt="imagem de ordem de serviço" />
              <strong>Ordens de serviço</strong>
            </Content>
          </Link>
        </Box>
        {/* </div> */}

        <Box className={user.tag === 'admin' ? '' : 'disabled'}>
          <Link to="/rules">
            <Content>
              <img src={fluxo} alt="imagem de fluxo grama" />
              <strong>Normas interna</strong>
            </Content>
          </Link>
        </Box>
        <Box className={user.tag === 'admin' ? '' : 'disabled'}>
          <Link to="/administrator/employers">
            <Content>
              <img src={adm} alt="imagem de administrador" />
              <strong>Administrador</strong>
            </Content>
          </Link>
        </Box>
      </SimpleGrid>
    </ContainerCard>
  );
};

export default Menu;
