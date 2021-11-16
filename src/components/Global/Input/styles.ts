import styled from 'styled-components';

export const Container = styled.div`
  background: '';
  border-radius: 6px;

  /* padding: 10px; */
  width: 100%;
  color: var(--dark-quaternary);

  display: flex;
  align-items: center;
  margin: 0 0 6px 0;

  & + div {
    margin: 6px 0 6px 0;
  }
`;
