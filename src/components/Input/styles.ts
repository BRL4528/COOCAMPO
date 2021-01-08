import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
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

  & + div {
    margin-top: 8px;
  }

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

  input {
    flex: 1;
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
