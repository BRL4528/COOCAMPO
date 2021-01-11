import React from 'react';

import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';

interface LayoutProps {
  children: React.HTMLAttributes<HTMLElement>;
  path: string;
}

const Layout: React.FC<LayoutProps> = ({ children, path }: LayoutProps) => {
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

export default Layout;
