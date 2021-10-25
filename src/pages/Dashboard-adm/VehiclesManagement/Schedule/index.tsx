/* eslint-disable no-shadow */
import { useCallback, useState } from 'react';
import {
  Flex,
  ScaleFade,
  Text,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Heading,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  SimpleGrid,
} from '@chakra-ui/react';

import { RiChatSmile3Line } from 'react-icons/ri';
import { HeaderUp } from '../../../../components/_components_0.2/Header_0.2';
import { Sidebar } from '../../../../components/_components_0.2/Sidebar_0.2';
import { Pagination } from '../../../../components/_components_0.2/Pagination';
import { CalendarPiker } from '../../../../components/_components_0.2/Calendar';
import { ListFloatCar } from '../../../../components/_components_0.2/FloatListCar';
import { FloatlistHours } from '../../../../components/_components_0.2/FloatListHours';

interface IVehicle {
  id: string;
}

export default function Schedule() {
  const [vehicleSelected, setVehicleSelected] = useState(
    'Nenhum veiculo selecionado',
  );
  const [daySelected, setDaySelected] = useState('');

  const handleSelectedVehicleId = useCallback((vehicle: Omit<IVehicle, ''>) => {
    setVehicleSelected(vehicle.id);
  }, []);

  const handleDateSelected = useCallback((day: Omit<string, ''>) => {
    setDaySelected(String(day));
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <HeaderUp />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" pb={4} px="6">
        <Sidebar />

        <ScaleFade initialScale={0.9} in>
          <ListFloatCar handleSelectedVehicleId={handleSelectedVehicleId} />

          <SimpleGrid columns={[1, null, 2]} spacing={10} flex="1">
            {/* <SimpleGrid
            columns={1}
            flex="1"
            spacing={10}
            minChildWidth={['120px', '220px']}
            align="flex-start"
          >
            <Flex
              direction="row"
              align="center"
              justify="initial"
              p={['6', '8']}
              bg="gray.800"
              borderRadius={8}
              pb="4"
            >
              <Avatar size="md" name="Bruno Luiz" mr="5" />
              <Flex
                // flex-direction="column"
                direction="column"
                justify="initial"
              >
                <Text>Bruno Luiz Guimarães Carvalho</Text>
                <Text color="gray.300">Fiat Etios</Text>
              </Flex>
            </Flex> */}

            <Box
              overflow="auto"
              borderRadius={8}
              bg="gray.800"
              p={['4', '8']}
              height="470"
            >
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="md" fontWeight="normal">
                  Fila de saida
                </Heading>
              </Flex>

              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Usuários</Th>
                    <Th>Horario S-H</Th>

                    <Th width="8" />
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Bruno Luiz</Text>
                        <Text fontSize="sm" color="gray.300">
                          Fiat Kronos
                        </Text>
                      </Box>
                    </Td>

                    <Td>09:30 - 08:30</Td>
                    <Td>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                          >
                            <Icon as={RiChatSmile3Line} fontSize="20" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent bg="gray.700">
                          <PopoverArrow bg="gray.700" borderColor="gray.700" />
                          <PopoverCloseButton />
                          <PopoverHeader>Solicite um favor!</PopoverHeader>
                          <PopoverBody>
                            Caso queira pedir para que Bruno Luiz leve algo em
                            algum lugar que dentro da rota planejada, solicite
                            por aqui.
                          </PopoverBody>
                          <PopoverFooter d="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                              <Button colorScheme="blue">Verificar rota</Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Bruno Luiz</Text>
                        <Text fontSize="sm" color="gray.300">
                          Fiat Kronos
                        </Text>
                      </Box>
                    </Td>

                    <Td>09:30 - 08:30</Td>
                    <Td>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                          >
                            <Icon as={RiChatSmile3Line} fontSize="20" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent bg="gray.700">
                          <PopoverArrow bg="gray.700" borderColor="gray.700" />
                          <PopoverCloseButton />
                          <PopoverHeader>Solicite um favor!</PopoverHeader>
                          <PopoverBody>
                            Caso queira pedir para que Bruno Luiz leve algo em
                            algum lugar que dentro da rota planejada, solicite
                            por aqui.
                          </PopoverBody>
                          <PopoverFooter d="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                              <Button colorScheme="blue">Verificar rota</Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Bruno Luiz</Text>
                        <Text fontSize="sm" color="gray.300">
                          Fiat Kronos
                        </Text>
                      </Box>
                    </Td>

                    <Td>09:30 - 08:30</Td>
                    <Td>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="blue"
                          >
                            <Icon as={RiChatSmile3Line} fontSize="20" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent bg="gray.700">
                          <PopoverArrow bg="gray.700" borderColor="gray.700" />
                          <PopoverCloseButton />
                          <PopoverHeader>Solicite um favor!</PopoverHeader>
                          <PopoverBody>
                            Caso queira pedir para que Bruno Luiz leve algo em
                            algum lugar que dentro da rota planejada, solicite
                            por aqui.
                          </PopoverBody>
                          <PopoverFooter d="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                              <Button colorScheme="blue">Verificar rota</Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Pagination />
            </Box>
            <Box borderRadius={8} bg="gray.800" p={['4', '8']} height="470">
              <CalendarPiker
                vehicleSelected={vehicleSelected}
                handleDateSelected={handleDateSelected}
              />
            </Box>
          </SimpleGrid>
          <FloatlistHours
            vehicleSelected={vehicleSelected}
            daySelected={daySelected}
          />
        </ScaleFade>
      </Flex>
    </Flex>
  );
}
