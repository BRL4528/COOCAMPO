import { SliderMark } from '@chakra-ui/react';

export function MonthList() {
  return (
    <>
      <SliderMark value={1} mt="2" fontSize="sm">
        Jan.
      </SliderMark>
      <SliderMark value={2} mt="2" ml="" fontSize="sm">
        Fev.
      </SliderMark>
      <SliderMark value={3} mt="2" fontSize="sm">
        Mar.
      </SliderMark>
      <SliderMark value={4} mt="2" fontSize="sm">
        Abr.
      </SliderMark>
      <SliderMark value={5} mt="2" fontSize="sm">
        Mai.
      </SliderMark>
      <SliderMark value={6} mt="2" fontSize="sm">
        Jun.
      </SliderMark>
      <SliderMark value={7} mt="2" fontSize="sm">
        Jul.
      </SliderMark>
      <SliderMark value={8} mt="2" fontSize="sm">
        Ago.
      </SliderMark>
      <SliderMark value={9} mt="2" fontSize="sm">
        Set.
      </SliderMark>
      <SliderMark value={10} mt="2" fontSize="sm">
        Out.
      </SliderMark>
      <SliderMark value={11} mt="2" fontSize="sm">
        Nov.
      </SliderMark>
      <SliderMark value={12} mt="2" fontSize="sm">
        Dez.
      </SliderMark>
    </>
  );
}
