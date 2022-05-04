import React from 'react';

import Header from '../../../components/Global/Header';
import Sidebar from '../../../components/Admin/Sidebar';

interface LayoutProps {
  children: React.HTMLAttributes<HTMLElement>;
  path: string;
}

const LayoutAdm: React.FC<LayoutProps> = ({ children, path }: LayoutProps) => {
  if (path === '/menu') {
    return (
      <>
        <Sidebar pathname={path} />
        {children}
      </>
    );
  }
  if (path.substring(0, 6) === '/miles') {
    return <>{children}</>;
  }
  if (path.substring(0, 14) === '/bi-management') {
    return <>{children}</>;
  }
  if (path.substring(0, 14) === '/profile') {
    return <>{children}</>;
  }
  if (path.substring(0, 18) === '/management-energy') {
    return <>{children}</>;
  }

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

export default LayoutAdm;
