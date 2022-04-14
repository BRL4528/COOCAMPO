import {
  Center,
  Text,
  Box,
  Button,
  ScaleFade,
  Image,
  ButtonGroup,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';

import plant from '../../../../assets/plant.png';
import { useCan } from '../../../../hooks/useCan';

export default function EnergyManagement() {
  const userCanSeeEditEnergy = useCan({
    permissions: ['edit_energy'],
  });
  const userCanSeeMetricsEnergy = useCan({
    permissions: ['data_energy'],
  });

  return (
    <>
      <HeaderUp path="bi" />
      <Sidebar path="bi" />
      <Center h="60vh">
        <ScaleFade initialScale={0.9} in>
          {/* <Flex alignItens="center"> */}
          <Box display="flex" alignItems="center" flexDirection="column">
            <Image
              maxWidth="90px"
              src={plant}
              alt="Dan Abramov"
              width="480px"
            />
            <Text fontSize="25px">O que deseja fazer neste momento?</Text>

            <ButtonGroup mt="5">
              {userCanSeeEditEnergy ? (
                <Button
                  as={Link}
                  to="/management-energy/energy-table"
                  colorScheme="green"
                >
                  Gerenciar informações
                </Button>
              ) : (
                ''
              )}
              {userCanSeeMetricsEnergy ? (
                <Button as={Link} to="/bi-management/energy" colorScheme="blue">
                  Análisar métricas
                </Button>
              ) : (
                ''
              )}
            </ButtonGroup>
          </Box>
          {/* </Flex> */}
        </ScaleFade>
      </Center>
    </>
  );
}
