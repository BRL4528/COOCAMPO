import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2rem;
  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }
    tr {
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
        max-width: 300px;
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
