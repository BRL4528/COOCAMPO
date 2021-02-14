import React from 'react';

interface LayoutProps {
  children: React.HTMLAttributes<HTMLElement>;
  path: string;
}

const LayoutUser: React.FC<LayoutProps> = ({ children, path }: LayoutProps) => {
  return <div>nada</div>;
};

export default LayoutUser;
