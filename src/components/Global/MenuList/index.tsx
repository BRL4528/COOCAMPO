/* eslint-disable no-constant-condition */
/* eslint-disable react/style-prop-object */
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Box, Center, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from '../../../hooks/auth';

import { ContainerCard, Content } from './styles';

import destin from '../../../assets/destin.svg';
import pie from '../../../assets/pie.svg';
import os from '../../../assets/os.svg';
import fluxo from '../../../assets/fluxo.svg';
import adm from '../../../assets/adm.svg';
import { SetToggleThemeContext } from '../../../contexts/SetToggleThemeContext';

const MenuList: React.FC = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { user } = useAuth();
  const { toggleTheme } = useContext(SetToggleThemeContext);

  return (
    <ContainerCard theme={toggleTheme}>
      <Center>
        <SimpleGrid
          flex="1"
          columns={[2, null, 4]}
          // columns={{ sm: 2, md: 4 }}
          spacing={5}
          // minChildWidth={['370px', '400', '420px']}
          align="flex-start"
          mt={isWideVersion ? '0' : '10rem'}
        >
          <Box m="5px">
            <Link to="/miles/dashboard">
              <Content>
                <img src={destin} alt="imagem de destino" />
                <strong>Controle de frota</strong>
              </Content>
            </Link>
          </Box>

          <Box m="5px">
            {/* <Link to="/management-ppr/dashboard"> */}
            <Link to="/bi-management/dashboard">
              <Content>
                <img src={pie} alt="imagem de grafico pizza" />
                {/* <strong>Gerenciamento PPR</strong> */}
                <strong>Inteligência de negócios</strong>
              </Content>
            </Link>
          </Box>

          {/* <div className={user.tag === 'admin' ? '' : 'disabled'}> */}
          <Box m="5px">
            <Link to="/service-orders/service-integrity">
              <Content>
                <img src={os} alt="imagem de ordem de serviço" />
                <strong>Ordens de serviço</strong>
              </Content>
            </Link>
          </Box>
          {/* </div> */}

          {/* <Box className={user.tag === 'admin' ? '' : 'disabled'} m="5px"> */}
          <Box m="5px">
            <Link to="/rules">
              <Content>
                <img src={fluxo} alt="imagem de fluxo grama" />
                <strong>Normas e manuais</strong>
              </Content>
            </Link>
          </Box>
          {/* </Box> */}
          <Box className={user.tag === 'admin' ? '' : 'disabled'} m="5px">
            <Link to="/administrator/employers">
              <Content>
                <img src={adm} alt="imagem de administrador" />
                <strong>Administrador</strong>
              </Content>
            </Link>
          </Box>
        </SimpleGrid>
      </Center>
    </ContainerCard>
  );
};

export default MenuList;
