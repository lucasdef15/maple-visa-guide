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
  font-family: 'Candara', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${(props) => props.theme.light.blue600};
}
body{
    background-color: ${(props) => props.theme.light.white200};
    overflow-x: hidden;
}
img{
    display: block;
    width: 100%;
    position: relative;
}
.spacing {
  width: min(80vmax, 95%);
  margin: 0 auto;
}

`;
