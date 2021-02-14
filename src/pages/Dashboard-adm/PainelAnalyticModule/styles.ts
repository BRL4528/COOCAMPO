import styled, { css } from 'styled-components';

interface ICheck {
  checked: boolean;
  idCurrent: string;
  idChecked: string;
}

// transition: width 600ms ease;

export const Container = styled.div`
  .selected {
    background: rgba(194, 217, 211, 0.58);
    border-bottom: 3px solid #4caf50;
    max-height: 80px;

    h2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      > span {
        visibility: visible;
        svg {
          color: #4caf50;
          border-color: #f2c811;

          cursor: pointer;
        }
      }
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  color: #073b4c;
  background: #f6eee7;
  width: 100%;
  height: 100vh;

  > header {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 700px;

    margin: 15px;
    border-radius: 6px;
    min-height: 100px;
    padding: 35px;
    /* border-bottom: 3px solid #f2c811; */
    background: #f2c811;
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
    border-bottom: solid 1px rgba(150, 156, 186, 0.2);
    margin: 14px 0 15px 5px;
    color: var(--text-primary);
  }

  > div {
    min-width: 700px;
    /* background-color: rgba(194, 217, 211, 0.58); */

    transition: max-height 1s;
    background: #fff;
    border-bottom: 3px solid #fff;
    max-height: 600px;

    /* ${props =>
      props.checked &&
      css`
        transition: max-height 2s;
        max-height: 600px;
        background-color: #fff;
        border-bottom: 3px solid #fff;
      `}; */

    overflow: hidden;
    white-space: nowrap;

    padding: 25px;

    margin: 15px 0 15px 0;
    border-radius: 6px;
    transition: var(--transition-speed);

    :hover {
      border-bottom: 3px solid #f2c811;
    }

    div {
      display: flex;
      align-items: center;
      margin: 0 0 0 5px;
      input {
        margin: 15px;
      }

      div {
        /* background: red; */
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
