import styled from 'styled-components';

interface ICheck {
  checked: boolean;
  idCurrent: string;
  idChecked: string;
}

export const Container = styled.div`
  .selected {
    background: var(--green-secundary);
    border-bottom: 3px solid var(--green-primary);
    max-height: 80px;

    h2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      > span {
        visibility: visible;
        svg {
          color: var(--green-primary);
          border-color: var(--color-theme-primary);

          cursor: pointer;
        }
      }
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  color: #073b4c;
  width: 100%;

  > header {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 700px;

    margin: 15px;
    border-radius: 6px;
    min-height: 100px;
    padding: 35px;
    background: var(--color-theme-primary);
  }
`;
export const CardContainer = styled.div<ICheck>`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 700px;

  div {
    h2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      > span {
        visibility: hidden;
        div {
          height: 11px;
        }
      }
    }
  }

  h3 {
    border-bottom: solid 1px var(--text-tertiary);
    margin: 14px 0 15px 5px;
    color: var(--text-primary);
  }

  > div {
    min-width: 700px;
    transition: max-height 1s;
    background: var(--white-secondary);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.07);
    border-bottom: 3px solid var(--white-secondary);
    max-height: 600px;

    overflow: hidden;
    white-space: nowrap;

    padding: 25px;
    margin: 15px 0 15px 0;
    border-radius: 6px;
    transition: var(--transition-speed);

    :hover {
      border-bottom: 3px solid var(--color-theme-primary);
    }

    div {
      display: flex;
      align-items: center;
      margin: 0 0 0 5px;
      input {
        margin: 15px;
      }

      div {
        width: 200px;

        strong {
          /* text-overflow: ellipsis; */
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 400;
        }
      }
    }
  }
`;

export const CardLoading = styled.div`
  > svg {
    margin-top: 200px;
    color: var(--text-primary);
    width: 80px;
  }
`;
