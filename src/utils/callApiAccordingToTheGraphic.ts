/* eslint-disable consistent-return */
import React from 'react';
import { api } from '../services/api';

interface IVehicle {
  id: string;
  km: number;
}
interface DateGraphicState {
  date_start: string;
  date_end: string;
  title?: string;
}
interface IKilometersTraveled {
  months: [string];
  results: [number];
}

interface PropsCallApi {
  veicleSelected: IVehicle;
  dateGraphic: DateGraphicState;
  seDataKilometersTraveled: (
    value: React.SetStateAction<IKilometersTraveled | undefined>,
  ) => void;
  setDataUsageFee: (
    value: React.SetStateAction<IKilometersTraveled | undefined>,
  ) => void;
  setDataConsumption: (
    value: React.SetStateAction<IKilometersTraveled | undefined>,
  ) => void;
  setMonthlyConsumption: (
    value: React.SetStateAction<IKilometersTraveled | undefined>,
  ) => void;
  setLoadingOne: (value: React.SetStateAction<boolean>) => void;
  setLoadingTwo: (value: React.SetStateAction<boolean>) => void;
  setLoadingThree: (value: React.SetStateAction<boolean>) => void;
  setLoadingFour: (value: React.SetStateAction<boolean>) => void;
}

export default async function callApiAccordingToTheGraphic({
  veicleSelected,
  dateGraphic,
  seDataKilometersTraveled,
  setDataUsageFee,
  setDataConsumption,
  setMonthlyConsumption,
  setLoadingOne,
  setLoadingTwo,
  setLoadingThree,
  setLoadingFour,
}: PropsCallApi) {
  if (
    dateGraphic.title === 'Taxa de utilização' ||
    dateGraphic.title === undefined
  ) {
    setLoadingOne(true);
    const response = await api.get(
      `/kilometers/show-use-vehicle-month?vehicle_id=${veicleSelected.id}&start_date=${dateGraphic?.date_start}&end_date=${dateGraphic?.date_end}`,
    );
    setLoadingOne(false);
    setDataUsageFee(response.data);
  }
  if (
    dateGraphic.title === 'Quilometros rodados' ||
    dateGraphic.title === undefined
  ) {
    setLoadingTwo(true);
    const response = await api.get(
      `/kilometers/calc-km-traveled-month?vehicle_id=${veicleSelected.id}&start_date=${dateGraphic?.date_start}&end_date=${dateGraphic?.date_end}`,
    );
    setLoadingTwo(false);
    seDataKilometersTraveled(response.data);
  }
  if (
    dateGraphic.title === 'Média de consumo por quilometragem' ||
    dateGraphic.title === undefined
  ) {
    setLoadingThree(true);
    const response = await api.get(
      `/supplies/calc-fuel-month?vehicle_id=${veicleSelected.id}&start_date=${dateGraphic?.date_start}&end_date=${dateGraphic?.date_end}`,
    );
    setLoadingThree(false);
    setDataConsumption(response.data);
  }
  if (
    dateGraphic.title === 'Consumo mensal' ||
    dateGraphic.title === undefined
  ) {
    setLoadingFour(true);
    const response = await api.get(
      `/supplies/calc-quantity-month?vehicle_id=${veicleSelected.id}&start_date=${dateGraphic?.date_start}&end_date=${dateGraphic?.date_end}`,
    );
    setLoadingFour(false);
    setMonthlyConsumption(response.data);
  }
}
