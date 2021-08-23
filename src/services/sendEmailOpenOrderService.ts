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
  observations: string;
  reason: string;
  status: string;
  updated_at: string;
  urgency: string;
}

interface IUser {
  name: string;
  email: string;
}

export async function handleSendEmailOpenOrderServiceAdm(data: {
  name: any;
  urgency: any;
  reason: any;
  created_at: string | number | Date;
  id: any;
}): Promise<IdataTable> {
  await api.post('/send-email-os', {
    body: `${data.name} abriu uma nova ordem de serviço, segue descrição da solicitação.
    `,
    urgency: `${data.urgency}`,
    reason: `${data.reason}`,
    date: `${format(new Date(data.created_at), 'dd/MM/yyyy - HH:mm:ss', {
      locale: ptBR,
    })}`,
    subject: `Nova ordem de serviço - id ${parseInt(data.id || 'x', 16)}`,
    to: [
      {
        name: 'Bruno Luiz',
        address: 'bruno.carvalho@cooasgo.com.br',
      },
    ],
  });

  return data.name;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function handleSendEmailOpenOrderServiceUser(
  data: IdataTable,
  user: IUser,
) {
  await api.post('/send-email-os', {
    body: `Você abriu uma nova ordem de serviço, segue descrição da solicitação.
    `,
    urgency: `${data.urgency}`,
    reason: `${data.reason}`,
    date: `${format(new Date(data.created_at), 'dd/MM/yyyy - HH:mm:ss', {
      locale: ptBR,
    })}`,
    subject: `Nova ordem de serviço - id ${parseInt(data.id || 'x', 16)}`,
    to: [
      {
        name: `${user.name}`,
        // address: `${user.email}`,
        address: 'bruno.carvalho@cooasgo.com.br',
      },
    ],
  });

  return data.name;
}
