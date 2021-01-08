import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
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
