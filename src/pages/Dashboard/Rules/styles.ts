import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 0 2rem 3rem;
  transition: box-shadow 0.5s;

  .result {
    :hover {
      transition: box-shadow 0.5s;
      box-shadow: 8px 5px 5px rgba(0, 0, 0, 0.07);
    }
  }
`;

export const NicList = styled.div`
  max-width: 720px;
  margin: 5rem auto 0;

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;

    form {
      width: 100%;
      margin: 2rem 0 2rem 0;
    }
    img {
      max-width: 400px;
    }

    section {
      margin-bottom: 3rem;

      button {
        margin: 10px;
        border-radius: 12px;
        padding: 10px;
        background: var(--color-theme-primary);
        border: none;
        font-weight: bold;

        transition: var(--transition-speed);

        :hover {
          transition: var(--transition-speed);

          background: ${shade(0.2, '#f2c811')};
        }
      }
    }
  }

  a {
    display: block;

    & + a {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--gray-700);
    }

    time {
      font-size: 1rem;
      display: flex;
      align-items: center;
      color: var(--gray-300);
    }

    strong {
      display: block;
      font-size: 1.5rem;
      margin-top: 1rem;
      line-height: 2rem;
      transition: color 0.2s;
      color: #333;
    }

    p {
      color: var(--gray-300);
      margin-top: 0.5rem;
      line-height: 1.625rem;
    }

    &:hover strong {
      color: var(--yellon-500);
    }
  }
`;
