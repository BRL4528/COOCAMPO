import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--dark-secondary);
    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  button {
    border: 0;
    background: transparent;
    color: var(--red-primary);
    margin-left: 5px;
    cursor: pointer;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: var(--dark-tertiary);
      margin-top: 5px;
    }
  }
`;
