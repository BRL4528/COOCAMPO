import styled from 'styled-components';

export const Conatiner = styled.div`
  /* display: flex; */
  color: #333;
  width: 100%;
  height: 100vh;
  /* background: red; */
  /* height: 745px; */
  padding-left: 80px;
  z-index: 0;
  overflow-x: visible;
  /* grid-template-columns: 600px; */
  /* grid-template-rows: 46px auto 52px; */
  /* grid-template-areas: 'GA GA GA'; */

  /* ::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: #1e1e24;
  }

  ::-webkit-scrollbar-thumb {
    background: #f2c811;
  } */
`;
export const CardItem = styled.div`
  display: flex;
  color: #333;
  /* width: 100%; */
  z-index: 0;
  /* grid-template-columns: 600px; */
  /* grid-template-rows: 46px auto 52px; */
  /* grid-template-areas: 'GA GA GA'; */
  @media only screen and (max-width: 600px) {
    display: grid;
  }
`;
export const CardGraphic = styled.div`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 20px 0 0;
  /* margin-left: 80px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background: #fff;
  border-radius: 6px;
  /* transition: var(--transition-speed); */
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);
  /* padding: 20px; */
  margin: 20px 20px 20px 20px;
  width: 250px;
  height: 150px;
  transition: var(--transition-speed);
  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #1c9cd9;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }
  span {
    left: 90px;
    top: 110px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    max-width: 260px;
    max-height: 200px;
    position: absolute;
  }
`;

export const CardGraphicItem = styled.div`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px 10px 40px 30px;
  /* margin-left: 80px; */

  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  /* transition: var(--transition-speed); */
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);
  /* padding: 20px; */
  margin: 20px 20px 20px 20px;
  height: 400px;
  width: 570px;
  transition: var(--transition-speed);
  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #f2c811;
    box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.15);
  }
  div {
    cursor: pointer;
  }
`;

export const CardGraphicText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: solid 1px rgba(150, 156, 186, 0.2);
  margin-bottom: 20px;
  > span {
    display: flex;
    flex-direction: row;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      margin: 10px;
      transition: color 0.5s;
      :hover {
        cursor: pointer;
        color: #1c9cd9;
      }
    }
  }
`;

export const GraphicTitle = styled.h2`
  width: 100%;
  padding-bottom: 15px;
`;

export const CardBodyGoals = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
