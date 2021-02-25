import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--white-secondary);
  border-radius: 3px;
  border: 1px solid var(--dark-quaternary);
  padding: 10px;
  width: 100%;
  color: var(--dark-quaternary);

  display: flex;
  align-items: center;

  & + div {
    margin: 6px 0 6px 0;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red-secundary);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ;
      border-color: #1c9cd9;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #1c9cd9;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--dark-primary);

    &::placeholder {
      color: #a0a4a8;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  svg {
    margin: 0;
    margin-left: 16px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
