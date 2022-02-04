import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Nic = styled.article`
  max-width: 720px;
  margin: 5rem auto 0;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--text-quarterly);
  }

  time {
    display: block;
    font-size: 1rem;
    color: var(--gray-300);
    margin-top: 1.5rem;
  }
  .nicContent {
    margin-top: 2rem;
    line-height: 2rem;
    font-size: 1.125rem;
    color: var(--text-title);

    p,
    ul {
      margin: 1.5rem 0;
    }

    ul {
      padding-left: 1.5rem;
      li {
        margin: 0.5rem 0;
      }
    }
    img {
      width: 800px;
    }
  }
`;
