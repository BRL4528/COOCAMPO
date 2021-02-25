import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --text-primary: #b2b2b2;
    --text-secondary: #ececec;
    --text-tertiary: rgba(150, 156, 186, 0.2);
    --text-quarterly: #433f59;

    --white-primary: #F8F8FB;
    --white-secondary: #fff;
    --white-tertiary: #f4ede8;

    --beige-primary: #fdf6e3;
    --beige-secondary: #f5e5b8;

    --dark-primary: #1e1e24;
    --dark-secondary: #444;
    --dark-tertiary: #999591;
    --dark-quaternary: #a0a4a8;

    --red-primary: #e83f5b;
    --red-secundary: #c53030;

    --green-primary: #4caf50;
    --green-secundary: rgba(194, 217, 211, 0.58);

    --color-theme-primary: #f2c811;
    --color-theme-secundary: #1c9cd9;

    --transition-speed: 600ms;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--white-primary);
    color: var(--white-secondary);
    -webkit-font-smoothing: antialiased;
  }

  //add agora
  body::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem
  }

  body::-webkit-scrollbar-track {
    background: var(--dark-primary);
  }

  body::-webkit-scrollbar-thumb {
    background:   var(--color-theme-primary);
  }



  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;

  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  @media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

.select-react {
  font-size: 10;
}


`;
