import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 6px;
  border: 1px solid #a0a4a8;
  padding: 10px;
  width: 100%;
  color: #a0a4a8;

  display: flex;
  align-items: center;

  margin: 6px 0 6px 6px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #1c9cd9;
      border-color: #1c9cd9;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #1c9cd9;
    `}



  textarea {
    flex: 1;
    /* width: 100%; */
    background: transparent;
    border: 0;
    color: #433f59;

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
