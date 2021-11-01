import { format, isPast } from 'date-fns';

interface IAvailable {
  start_date: string;
  end_date: string;
}

export function createArayHoursFormated(
  hoursAvailableDontFormated: IAvailable[],
  daySelected: string,
) {
  const dt = new Date(1970, 0, 1, 0, 0, 0, 0);
  const array = [];
  const dayFormated =
    daySelected === ''
      ? format(new Date(), 'yyyy-MM-dd')
      : format(new Date(daySelected), 'yyyy-MM-dd');

  while (dt.getDate() === 1) {
    const point = dt.toLocaleTimeString('pt-BR');
    dt.setMinutes(dt.getMinutes() + 30);

    const dateFomated = `${dayFormated} ${point}`;

    const dateAvailable = hoursAvailableDontFormated.map(date => {
      const t =
        new Date(dateFomated) > new Date(date.start_date) &&
        new Date(dateFomated) < new Date(date.end_date);

      return t;
    });

    const dateFormatedFinish = {
      date: dateFomated,
      available: !dateAvailable[0],
    };
    if (!isPast(new Date(dateFormatedFinish.date))) {
      array.push(dateFormatedFinish);
    }
  }

  return array;
}
