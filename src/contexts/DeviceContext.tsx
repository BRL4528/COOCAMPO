import { createContext, ReactNode } from 'react';
import checkDevice from '../hooks/checkDevice';

interface Props {
  children: ReactNode;
}

interface PropsDeviceContext {
  window: number;
}

export const DeviceContext = createContext({} as PropsDeviceContext);

export function CheckDevice({ children }: Props) {
  const formated = {
    window: checkDevice(),
  };

  return (
    <DeviceContext.Provider value={formated}>{children}</DeviceContext.Provider>
  );
}
