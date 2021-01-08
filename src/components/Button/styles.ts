import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #1c9cd9;
  height: 45px;
  border-radius: 6px;
  border: 0;
  padding: 0 10px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#1c9cd9')};
  }
`;
