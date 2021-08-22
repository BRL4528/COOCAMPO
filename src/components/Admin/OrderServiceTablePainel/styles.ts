import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2rem;

  table {
    width: 98%;
    min-width: 1265px;
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
        text-overflow: ellipsis;
        max-width: 295px;
        max-height: 50px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 100px;

        svg {
          margin-left: 5px;
        }
      }

      button {
        max-width: 70px;
        min-width: 70px;
        max-height: 30px;
        border: none;
        font-size: 12px;
        text-align: center;
        padding: 0;
      }
      &:first-child {
        color: var(--text-title);
      }
      &.Baixo {
        p {
          color: var(--color-title-in-primary);
          background: var(--green);
          width: 90px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
      &.Medio {
        p {
          color: var(--color-title-in-primary);
          background: var(--yellon);
          width: 90px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
      &.Alto {
        p {
          color: var(--color-title-in-primary);
          background: var(--red-primary);
          width: 90px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
      .Pendente {
        p {
          color: var(--red-primary);
        }
        svg {
          color: var(--red-primary);
        }
      }
      .Finalizado {
        p {
          color: var(--green);
        }
        svg {
          color: var(--green);
        }
      }
    }
  }
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;

  div {
    margin: 0 auto;
    strong {
      color: var(--text-quarterly);
      margin: 0 15px 0 15px;
    }

    button {
      border: none;
      color: var(--text-quarterly);
      background: none;
      transition: var(--transition-speed);

      :hover {
        background: var(--text-secondary);
        transition: var(--transition-speed);
      }
    }
    button:disabled {
      cursor: not-allowed;
      /* pointer-events: all !important; */
    }
  }
`;
