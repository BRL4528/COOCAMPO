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
  appointments: Appointments,
) {
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
        console.log('appointments', appointments);
        const bodyEmail = {
          leader: true,
          conductor: appointments.conductor.name,
          link: 'https://cooasgo.samasc.com.br/miles/schedule',
          subject: `Agendamento do ${appointments.vehicle.name}`,
          to: addresFormated,
        };
        console.log(bodyEmail);
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
          subject: `Solicitação de veículo`,
          to: addresFormated,
        };
        console.log(bodyEmail);
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
      subject: `Solicitação de veículo`,
      to: [appointments.conductor.email],
    };
    console.log(bodyEmail);
    await api.post('/send-email-appointment', bodyEmail);
  } catch (err) {
    console.log(err);
  }

  return 'e';
}
