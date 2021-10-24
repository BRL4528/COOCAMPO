/* eslint-disable @typescript-eslint/no-empty-function */
import { Flex, Box, Image, useBreakpointValue } from '@chakra-ui/react';

const vehicles = [
  {
    name: 'Fiat Kronos',
    plate: '785-4718',
    img: 'https://www.autoinforme.com.br/wp-content/uploads/2020/03/GM-tracker_2021.jpg',
  },
  {
    name: 'Fiat Strada',
    plate: '4523-3412',
    img: 'https://www.autoo.com.br/fotos/2021/5/1280_960/chevrolet_tracker_2021_1_26052021_48144_1280_960.jpg',
  },
  {
    name: 'Fiat Strada',
    plate: '4523-3412',
    img: 'https://www.autoo.com.br/fotos/2021/5/1280_960/chevrolet_tracker_2021_1_26052021_48144_1280_960.jpg',
  },
  {
    name: 'Fiat Strada',
    plate: '455-3432312',
    img: 'https://blog.nakata.com.br/wp-content/uploads/2020/08/post_thumbnail-1f77e8996174df4fb19587977331de22-780x450.jpg',
  },
  {
    name: 'Fiat Strada',
    plate: '455-3432312',
    img: 'https://blog.nakata.com.br/wp-content/uploads/2020/08/post_thumbnail-1f77e8996174df4fb19587977331de22-780x450.jpg',
  },
];

export function ListFloatCar() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Flex
        align="center"
        flexDirection="row"
        mt="15"
        pb="5"
        w={[360, 460, 600, 950, 1100, 1135]}
        overflowX="scroll"
        flexWrap="nowrap"
        mb="8"
        borderRadius={8}
      >
        {vehicles.map(vehicle => (
          <Box
            bg="gray.800"
            borderRadius="5px"
            borderWidth="1px"
            borderColor="gray.700"
            mr="5"
            minWidth="230"
            // ="250px"
          >
            <button type="button" onClick={() => {}}>
              <Box>
                {isWideVersion && (
                  <Image
                    borderTopRadius={8}
                    borderColor="gray.700"
                    boxSize="250"
                    h="140"
                    alt="carrro"
                    src={vehicle.img}
                  />
                )}

                <section>
                  <p>
                    {vehicle.name} - placa {vehicle.plate}
                  </p>
                  <p>2344 KM rodados até agora</p>
                </section>
              </Box>
            </button>
            <section>
              <div title="Fixar como favorito">
                <button type="button" onClick={() => {}}>
                  Icon
                </button>
              </div>
            </section>
          </Box>
        ))}
      </Flex>
    </>
  );
}
