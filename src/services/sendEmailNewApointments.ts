import { api } from './api';

interface IAnalyticModule {
  id: string;
  name: string;
  address: string;
  name_schedule: string;
}

interface Appointments {
  id: string;
  conductor_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  date: string;
  route: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  conductor: {
    id: string;
    name: string;
    email: string;
  };
  vehicle: {
    name: string;
  };
}

export async function handleSendEmailNewAppointments(
  schedule: string,
  leader: string,
  appointments: Appointments,
) {
  try {
    await api
      .get<IAnalyticModule[]>(`/schedules/show?name_schedule=${schedule}`)
      .then(response => {
        const ivonei = {
          name: 'Ivonei Scotton',
          address: 'ivonei.scotton@cooasgo.com.br',
        };
        const addresFormated = response.data
          .filter(data => data.name === leader)
          .map(data => {
            return {
              name: data.name,
              address: data.address,
            };
          });

        if (
          addresFormated.filter(data => data.name !== ivonei.name).length !== 0
        ) {
          addresFormated.push(ivonei);
        }

        const bodyEmail = {
          leader: true,
          conductor: appointments.conductor.name,
          link: 'https://cooasgo.samasc.com.br/miles/schedule',
          subject: `Agendamento do ${appointments.vehicle.name}`,
          to: addresFormated,
        };
        // console.log('bodyEmail', bodyEmail);
        api.post('/send-email-appointment', bodyEmail);
      });
  } catch (err) {
    console.log(err);
  }

  return 'e';
}

export async function handleResendEmailAppointments(schedule: string) {
  try {
    await api
      .get<IAnalyticModule[]>(`/schedules/show?name_schedule=${schedule}`)
      .then(response => {
        const addresFormated = response.data.map(data => {
          return {
            name: data.name,
            address: data.address,
          };
        });

        const bodyEmail = {
          leader: true,
          conductor: '',
          link: 'https://cooasgo.samasc.com.br/miles/schedule',
          subject: `Solicita????o de ve??culo`,
          to: addresFormated,
        };
        // console.log(bodyEmail);
        api.post('/send-email-appointment', bodyEmail);
      });
  } catch (err) {
    console.log(err);
  }

  return 'e';
}

export async function handleSendEmailForRequesterAppointments(
  appointments: Appointments,
  status: string,
) {
  try {
    const bodyEmail = {
      leader: false,
      status,
      conductor: '',
      link: 'https://cooasgo.samasc.com.br/miles/schedule',
      subject: `Solicita????o de ve??culo`,
      to: [appointments.conductor.email],
    };
    // console.log(bodyEmail);
    await api.post('/send-email-appointment', bodyEmail);
  } catch (err) {
    console.log(err);
  }

  return 'e';
}
