import styled from 'styled-components';

export const Container = styled.div`
  color: #333;
  width: 100%;
  /* height: 93vh; */
  /* padding: 80px; */
  overflow-x: visible;
  scroll-behavior: smooth;

  display: flex;
  align-items: center;
  text-align: center;

  a {
    text-decoration: none;
  }

  .selected {
    max-height: 400px;

    /* transition: var(--transition-speed); */

    div {
      max-height: 200px;
      visibility: visible;
      opacity: 1;
      /* transition: var(--transition-speed); */
    }
    svg {
      color: #1c9cd9;
    }
    /* transition: max-height 10s; */
  }

  .logo {
    transform: rotate(180deg);
    transition: var(--transition-speed);
  }

  .fullscreen-enabled .fullscreen-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  .section-body {
    margin: 0 auto;
    table {
      border-spacing: 0 0.5rem;
      th {
        color: var(--text-body);
        font-weight: 400;
        padding: 1rem 2rem;
        text-align: left;
        line-height: 1.5rem;
      }
      tr {
        min-width: 1265px;
        transition: var(--transition-speed);

        :hover {
          background: var(--text-secondary);
          transition: var(--transition-speed);

          td {
            background: none;
          }
        }
      }
      td {
        padding: 1rem;
        border: 0;
        background: var(--shape);
        color: var(--text-body);
        /* border-radius: 0.25rem; */
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        transition: var(--transition-speed);

        div {
          display: flex;
          align-items: center;
          svg {
            margin-right: 5px;
          }
        }
        > p {
          text-align: left;
        }
      }
    }
  }
`;

export const CardeHeader = styled.div`
  display: flex;
  color: #333;
  width: 100%;

  align-items: center;
  justify-content: space-between;
  padding: 80px 80px 40px 80px;
  margin-top: 40px;
  div {
    h2 {
      display: flex;
      flex-direction: row;

      svg {
        margin-left: 4px;
      }
    }
  }
  strong {
    color: var(--text-primary);
    font-size: 14px;
  }
`;

export const CardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;

  div {
    min-width: 200px;
    margin: 0 10px 0 10px;
    /* transition: var(--transition-speed); */

    @media only screen and (max-width: 600px) {
      /* transition: var(--transition-speed); */
      display: none;
    }
  }
`;
