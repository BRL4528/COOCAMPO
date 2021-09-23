// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import { api } from './api';

interface IdataTable {
  created_at: string;
  email: string;
  id: string;
  name: string;
  reason: string;
  status: string;
  updated_at: string;
  urgency: string;
  identification: number;
  observations: string;
  reason_observation: string;
  file: string;
}

interface IUser {
  name: string;
  email: string;
}

export async function handleSendEmailOpenOrderServiceAdm(data: {
  id: any;
}): Promise<IdataTable> {
  console.log('ver isso', data);

  setTimeout(() => {
    api
      .get<IdataTable>(`/services-orders/show?id=${data.id}`)
      .then(response => {
        api.post('/send-email-os', {
          body: `${
            response.data.name
          } abriu uma nova ordem de serviço, segue descrição da solicitação. (${parseInt(
            response.data.id || 'x',
            16,
          )})`,
          urgency: `${response.data.urgency}`,
          reason: `${response.data.reason}`,
          observations: `${response.data.reason_observation}`,
          file: `https://api-samasc.s3.sa-east-1.amazonaws.com/os/file/${response.data.file}`,
          date: `${format(
            new Date(response.data.created_at),
            'dd/MM/yyyy - HH:mm:ss',
            {
              locale: ptBR,
            },
          )}`,
          subject: `${response.data.id}`,
          to: [
            {
              name: `${response.data.name}`,
              address: 'bruno.carvalho@cooasgo.com.br',
            },
            {
              name: `Edson Azambuja`,
              address: 'edson.azambuja@cooasgo.com.br',
            },
          ],
        });
      });
  }, 3000);

  // await api.post('/send-email-os', {
  //   body: `${data.name} abriu uma nova ordem de serviço, segue descrição da solicitação, Nova ordem de serviço - id ${data.identification}.
  //   `,
  //   urgency: `${data.urgency}`,
  //   reason: `${data.reason}`,
  //   date: `${format(new Date(data.created_at), 'dd/MM/yyyy - HH:mm:ss', {
  //     locale: ptBR,
  //   })}`,
  //   subject: `${data.id}`,
  //   to: [
  //     {
  //       name: 'Bruno Luiz',
  //       address: 'bruno.carvalho@cooasgo.com.br',
  //     },
  //   ],
  // });

  return data.id;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function handleSendEmailOpenOrderServiceUser(
  data: IdataTable,
  user: IUser,
) {
  console.log('ver id', data);
  setTimeout(() => {
    api
      .get<IdataTable>(`/services-orders/show?id=${data.id}`)
      .then(response => {
        api.post('/send-email-os', {
          body: `Você abriu uma nova ordem de serviço, segue descrição da solicitação. (${parseInt(
            response.data.id || 'x',
            16,
          )})
        `,
          urgency: `${data.urgency}`,
          reason: `${data.reason}`,
          observations: `${data.reason_observation}`,
          file: `https://api-samasc.s3.sa-east-1.amazonaws.com/os/file/${response.data.file}`,
          date: `${format(new Date(data.created_at), 'dd/MM/yyyy - HH:mm:ss', {
            locale: ptBR,
          })}`,
          subject: `Nova ordem de serviço - id ${parseInt(
            response.data.id || 'x',
            16,
          )}`,
          to: [
            {
              name: `${user.name}`,
              address: `${user.email}`,
              // address: 'bruno.carvalho@cooasgo.com.br',
            },
          ],
        });
      });
  }, 3000);

  return data.name;
}
