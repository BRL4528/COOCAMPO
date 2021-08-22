import React from 'react';

import Header from '../../../components/Global/Header';
import Sidebar from '../../../components/Admin/Sidebar';

interface LayoutProps {
  children: React.HTMLAttributes<HTMLElement>;
  path: string;
}

const LayoutAdm: React.FC<LayoutProps> = ({ children, path }: LayoutProps) => {
  return (
    <>
      {path === '/menu' ? (
        <>
          <Header>
            <span>{path}</span>
          </Header>
          {children}
        </>
      ) : (
        <>
          <Header>
            <span>{path}</span>
          </Header>
          <Sidebar pathname={path} />
          {children}
        </>
      )}
    </>
  );
};

export default LayoutAdm;
