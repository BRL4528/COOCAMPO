import styled from 'styled-components';

export const Container = styled.div`
  @media print {
    margin: 0;
    padding: 0;
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0;
      padding: 0;
      max-width: 2400px;
      max-height: 970px;
      background: red;
    }
  }

  .window {
    display: none;
  }
  .landscape {
    position: absolute;
    width: 160px;
    right: 0;
    margin-top: -65px;
  }
  .portrait {
    position: absolute;
    margin-top: -65px;
    display: flex;
    width: 190px;
    right: 0;
  }

  .temp {
    main {
      max-width: 1120px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .posts {
      max-width: 720px;
      margin: 5rem auto 0;

      a {
        display: block;
        text-decoration: none;

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
    }
  }
`;

export const CardeHeader = styled.div`
  margin-top: 75px;
  margin-left: 8%;
  margin-right: 8%;
  color: #433f59;
  font-size: 13px;
  /* width: 100%; */

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    button {
      margin: 0;
      padding: 0;
      width: 100px;
      height: 40px;
      background: var(--color-theme-primary);
      border-radius: 3px;
      border: solid 2px var(--color-theme-primary);
      padding: 0 10px;
      color: var(--white-secondary);

      svg {
        width: 16px;
      }
    }
  }

  strong {
    color: var(--text-primary);
    font-size: 12px;
  }
`;
