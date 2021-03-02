import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children = '',
  className,
}) => {
  return (
    <Container className={className}>
      <div>
        {children}
        <span>{title}</span>
      </div>
    </Container>
  );
};

export default Tooltip;
