import React from 'react';

import Header from '../../../components/Global/Header';
import Sidebar from '../../../components/User/Sidebar';

interface LayoutProps {
  children: React.HTMLAttributes<HTMLElement>;
  path: string;
}

const LayoutUser: React.FC<LayoutProps> = ({ children, path }: LayoutProps) => {
  return (
    <>
      <Header>
        <span>{path}</span>
      </Header>
      <Sidebar pathname={path} />
      {children}
    </>
  );
};

export default LayoutUser;
