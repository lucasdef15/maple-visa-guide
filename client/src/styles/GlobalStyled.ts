import { createGlobalStyle } from 'styled-components';

export const GlobalSyle = createGlobalStyle`
@font-face {
  font-family: 'Candara';
  src: url('./fonts/Candara_Bold.tff') format('woff2');
  font-weight: 700;
}
@font-face {
  font-family: 'Candara';
  src: url('./fonts/Candara.tff') format('woff2');
  font-weight: 500;
}
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Candara;
  color: ${(props) => props.theme.light.blue600};
}
body{
    background-color: ${(props) => props.theme.light.white200};
}
.spacing {
  width: min(80vmax, 95%);
  margin: 0 auto;
}
.example-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.next,
.prev {
  top: calc(50% - 20px);
  position: absolute;
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
}

.next {
  right: 10px;
}

.prev {
  left: 10px;
  transform: scale(-1);
}

/* img {
  position: absolute;
  max-width: 100vw;
} */

.refresh {
  padding: 10px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

`;
