import styled from 'styled-components';

interface IGoals {
  item: string;
  selected: string;
}

export const Container = styled.div`
  margin-top: 12px;
  margin-left: 8%;
  color: var(--text-quarterly);

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  @media only screen and (max-width: 600px) {
    transition: var(--transition-speed);
    margin-left: 1%;
  }
`;

export const CardeHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;

  div {
    min-width: 200px;
    margin: 0 10px 0 10px;

    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
`;

export const ContainerInfo = styled.div`
  display: grid;

  grid-template-columns: 500px 500px;
  grid-template-rows: auto;

  grid-template-areas: 'Goals Composition';
`;

export const Search = styled.div`
  text-align: center;
  margin-top: 25px;
  padding: 2.4px;
  border-radius: 3px;
  height: 35px;
  div {
    display: flex;
    align-items: center;
    max-height: 35px;
    > input {
      border: 1px solid #a0a4a8;
      border-radius: 3px;
      color: #433f59;
      width: 100%;
      height: 2.5rem;
      padding: 10px;

      &::placeholder {
        color: #a0a4a8;
      }
    }

    > button {
      z-index: 0;
      margin: 0px 0px 0px 15px;
      height: 39px;
      width: 98px;
    }
  }
`;

export const TableContainer = styled.div`
  margin-top: 45px;
  max-height: 500px;
  padding: 15px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: rgba(25, 25, 26, 0.23);
    border-radius: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #f2c811;
    border-radius: 12px;
  }

  button {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    text-align: initial;

    transition: transform 0.2s;
    border: none;
    & + button {
      margin-top: 16px;
    }
    &:hover {
      transform: translateX(10px);
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const TableInfo = styled.div`
  margin: 120px 0px 0px 25px;
`;

export const CadView = styled.div<IGoals>`
  position: absolute;
  visibility: hidden;
  background: #fff;
  border-radius: 5px;
  padding: 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  text-align: initial;
  transition: transform 0.2s;
  border: none;

  ${({ item, selected }: IGoals): string =>
    item === selected ? 'visibility: visible;' : ''}

  >span {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: initial;
    width: 100%;
    padding: 24px;
    border-radius: 5px;
    text-decoration: none;
    transition: transform 0.2s;
    border-bottom: 2px solid var(--text-tertiary);

    /* & + button {
      margin-top: 16px;
    } */
    /* img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    } */
    div {
      display: flex;
      flex-direction: column;
      text-align: initial;
      margin: 7px 0px 7px 0px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      color: var(--dark-tertiary);
      width: 20px;
      height: 20px;
      margin: 10px;
      transition: color 0.5s;

      :hover {
        cursor: pointer;
        color: var(--color-theme-primary);
      }
    }
  }
`;

export const ViewSubGoals = styled.div`
  margin-top: 20px;
  > span {
    padding: 24px;

    > div {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 16px;
      flex: 1;
      padding: 10px;
      border-radius: 4px;
      strong {
        font-size: 17px;
        color: #3d3d4d;
      }
      p {
        font-size: 15px;
        color: #a8a8b3;
        margin-top: 4px;
      }

      :hover {
        background: #eee;
      }

      svg {
        color: var(--dark-tertiary);
        /* width: 15px;  */
        /* height: 20px; */
        margin: 0px 0px 0px 20px;
        transition: color 0.5s;
        /* background: red */

        :hover {
          cursor: pointer;
          color: var(--color-theme-primary);
        }
      }
    }
  }
`;
