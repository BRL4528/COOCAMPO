import io from 'socket.io-client';

interface AppointmentsMessage {
  conductor: {
    name: string;
  };
  content: string;
}

const appointmentsQueue: AppointmentsMessage[] = [];
const socket = io('https://deploy.cooasgo.samasc.com.br');

socket.on('new_notification', newMessage => {
  appointmentsQueue.push(newMessage);
});

export function NotificationAppointments() {
  return <div>notificação</div>;
}
