import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  groud?: boolean;
}

export const Container = styled.button<ContainerProps>`
  z-index: 1;
  background: #f2c811;
  height: 45px;
  border-radius: 6px;
  border: solid 2px #f2c811;
  /* border: 0; */
  padding: 0 10px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  ${props =>
    props.groud &&
    css`
      background: #fff;
      color: #f2c811;
    `}

  &:hover {
    background: ${shade(0.2, '#f2c811')};

    border: ${shade(0.2, '#f2c811')};
  }
`;
