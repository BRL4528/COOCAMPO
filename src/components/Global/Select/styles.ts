import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFielld: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 6px;
  border: 1px solid #a0a4a8;
  /* padding: 10px; */
  width: 100%;
  color: #a0a4a8;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
  margin: 6px 0 6px 0;
  /* & + div {
  } */
  ${props =>
    props.isFocused &&
    css`
      color: #1c9cd9;
      border-color: #1c9cd9;
    `}
  ${props =>
    props.isFielld &&
    css`
      color: #1c9cd9;
    `}
    svg {
    margin-right: 8px;
    margin-left: 5px;
  }
`;
