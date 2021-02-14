import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --text-primary: #b2b2b2;
    --text-secondary: #ececec;
    --text-terciary: rgba(150, 156, 186, 0.2);
    --bg-primary: #F8F8FB;
    --bg-secondary: #fff;
    --transition-speed: 600ms;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #f8f8fb;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  //add agora
  body::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem
  }

  body::-webkit-scrollbar-track {
    background: #1e1e24;
  }

  body::-webkit-scrollbar-thumb {
    background:   #f2c811;
  }



  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    /* font-size: 16px; */
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
