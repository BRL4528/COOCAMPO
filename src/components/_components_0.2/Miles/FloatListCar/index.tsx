import { useCallback, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Image,
  useBreakpointValue,
  Button,
  Icon,
  Tooltip,
  Collapse,
  ScaleFade,
  Text,
} from '@chakra-ui/react';

import { RiBookmarkFill, RiAddLine, RiCloseLine } from 'react-icons/ri';
import { api } from '../../../../services/api';

interface IVehicles {
  id: string;
  name: string;
  plate: string;
  year: string;
  fuel: string;
  km: number;
  image: string;
  document: string;
  observations: string;
  image_url: string;
  document_url: string;
}

interface IListFloatCarProps {
  handleSelectedVehicleId: (vehicle: Omit<IVehicles, ''>) => void;
  updateNewData: string;
}

export function ListFloatCar({
  handleSelectedVehicleId,
  updateNewData,
}: IListFloatCarProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  // const [loading, setLoading] = useState(false);

  const [dataVehicles, setDataVehicles] = useState<IVehicles[]>([]);

  const [favoriteVehicle, setFavoriteVehicle] = useState<IVehicles>();
  const [updateVehicleFavorite, setUpdateVehicleFavorite] =
    useState<IVehicles>();

  const [selectedVehicle, setSelectedVehicle] = useState<IVehicles>();
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    const favoriteVehicleLocal = localStorage.getItem(
      '@Samasc:favoriteVehicle',
    );
    // setLoading(true);

    if (favoriteVehicleLocal) {
      setFavoriteVehicle(JSON.parse(favoriteVehicleLocal));
      setSelectedVehicle(JSON.parse(favoriteVehicleLocal));
      setOpenList(false);

      // setLoading(false);
    }
    if (!favoriteVehicleLocal) {
      setOpenList(true);
    }

    api.get('/vehicles').then(response => {
      if (favoriteVehicleLocal) {
        const verifyVehicle = response.data.filter(
          (vehicle: { id: any }) =>
            vehicle.id === JSON.parse(favoriteVehicleLocal || '').id,
        )[0];

        if (JSON.stringify(verifyVehicle) !== favoriteVehicleLocal) {
          localStorage.setItem(
            '@Samasc:favoriteVehicle',
            JSON.stringify(verifyVehicle),
          );
        }
        setSelectedVehicle(verifyVehicle);
        handleSelectedVehicleId(verifyVehicle);
      }

      setDataVehicles(response.data);
      // setLoading(false);
    });
    // setLoading(false);
  }, [handleSelectedVehicleId, updateVehicleFavorite, updateNewData]);

  const handleSetFavorite = useCallback(
    (data: IVehicles) => {
      if (data.id !== favoriteVehicle?.id) {
        localStorage.setItem('@Samasc:favoriteVehicle', JSON.stringify(data));
        setUpdateVehicleFavorite(data);
      }
    },
    [favoriteVehicle?.id],
  );

  const handleSelectedVehicle = useCallback(
    (data: IVehicles) => {
      handleSelectedVehicleId(data);
      setSelectedVehicle(data);
    },
    [handleSelectedVehicleId],
  );

  function hadleOpenList() {
    setOpenList(!openList);
  }

  return (
    <Box w={[370, 460, 600, 950, 1100, 1200]}>
      <Button
        size="sm"
        colorScheme="blue"
        fontWeight="medium"
        type="button"
        onClick={hadleOpenList}
        mb="14"
        mt="8"
      >
        <ScaleFade initialScale={0.9} in>
          {openList ? (
            <Icon as={RiCloseLine} fontSize="20" />
          ) : (
            <Icon as={RiAddLine} fontSize="20" />
          )}
          {openList ? 'Fechar lista de veiculos' : 'Abrir lista de veiculos'}
        </ScaleFade>
      </Button>
      {/* {loading ? (
        <Center>
          <Spinner mt="50" mb="50" />
        </Center>
      ) : ( */}
      <Collapse in={openList} animateOpacity>
        <Flex
          align="center"
          flexDirection="row"
          mt="15"
          pb="5"
          w={[370, 460, 600, 950, 1100, 1200]}
          overflowX="scroll"
          flexWrap="nowrap"
          mb="8"
          borderRadius={8}
        >
          {dataVehicles.map(vehicle => (
            <Box
              display="flex"
              key={vehicle.id}
              bg="gray.800"
              borderRadius="5px"
              borderWidth="2px"
              borderColor={
                selectedVehicle?.id === vehicle.id ? 'green.400' : 'gray.700'
              }
              mr="5"
              minWidth={isWideVersion ? '230px' : '300px'}
              maxHeight={isWideVersion ? '207px' : '60px'}
              minHeight={isWideVersion ? '207px' : '60px'}
              flexDirection="row"
              position="relative"
            >
              <Box
                onClick={() => handleSelectedVehicle(vehicle)}
                bg="none"
                textAlign={isWideVersion ? 'center' : 'initial'}
                w="100%"
                cursor="pointer"
                overflow="hidden"
                textOverflow="ellipsis"
                ml={isWideVersion ? '' : '25px'}
              >
                <Box display={isWideVersion ? '' : 'flex'}>
                  {isWideVersion ? (
                    <Image
                      borderTopRadius={4}
                      borderColor="gray.700"
                      boxSize="250"
                      maxHeight="140"
                      alt="veículo"
                      src={vehicle.image_url}
                      opacity={selectedVehicle?.id === vehicle.id ? '0.5' : ''}
                    />
                  ) : (
                    <Image
                      borderRadius={100}
                      borderColor="gray.700"
                      boxSize="50"
                      maxHeight="50"
                      alt="veículo"
                      src={vehicle.image_url}
                      mt="3px"
                      opacity={selectedVehicle?.id === vehicle.id ? '0.5' : ''}
                    />
                  )}

                  <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    ml={isWideVersion ? '' : '15px'}
                  >
                    <Text
                      overflow="hidden"
                      textOverflow="ellipsis"
                      fontSize="sm"
                    >
                      {vehicle.name} - placa {vehicle.plate}
                    </Text>
                    <Text fontSize="sm">{vehicle.km} KM rodados</Text>
                  </Box>
                </Box>
              </Box>
              <Box position="absolute">
                <Tooltip
                  hasArrow
                  label={
                    favoriteVehicle?.id === vehicle.id
                      ? 'Veiculo principal!'
                      : 'Marcar como principal!'
                  }
                  bg="blue.500"
                >
                  <Button
                    type="button"
                    onClick={() => handleSetFavorite(vehicle)}
                    bg=""
                    top="-13px"
                    left="-10px"
                    position="absolute"
                  >
                    <Icon
                      as={RiBookmarkFill}
                      fontSize="20"
                      color={
                        favoriteVehicle?.id === vehicle.id ? 'blue.500' : ''
                      }
                    />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Flex>
      </Collapse>
      {/* )} */}
    </Box>
  );
}
