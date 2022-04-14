import styled from 'styled-components';

export const Container = styled.div`
  body::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  body::-webkit-scrollbar-track {
    background: white;
  }
  body::-webkit-scrollbar-thumb {
    background: var(--text-title);
    border-radius: 6px;
  }

  div::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
  }
  div::-webkit-scrollbar-track {
    background: white;
  }

  div::-webkit-scrollbar-thumb {
    background: var(--text-primary);
    border-radius: 6px;
  }
`;
