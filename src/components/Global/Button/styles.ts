import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  groud?: boolean;
}

export const Container = styled.button<ContainerProps>`
  z-index: 1;
  background: var(--color-theme-primary);
  height: 45px;
  border-radius: 3px;
  border: solid 2px var(--color-theme-primary);
  padding: 0 10px;
  color: var(--white-secondary);
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  ${props =>
    props.groud &&
    css`
      background: var(--white-secondary);
      color: var(--color-theme-primary);
    `}

  &:hover {
    background: ${shade(0.2, '#f2c811')};

    border: ${shade(0.2, '#f2c811')};
  }

  .styleLoadButton {
    cursor: wait;
  }
`;
