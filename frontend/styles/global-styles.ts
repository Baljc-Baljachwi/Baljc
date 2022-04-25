import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  html, body, #__next {
    height: 100%;
  }
  body { font-family: 'Noto Sans KR', sans-serif; }
    .normal		{ font-weight: 400 }
    .bold		  { font-weight: 700 }
    .bolder		{ font-weight: 800 }
    .light		{ font-weight: 300 }
  a { cursor: pointer; text-decoration: none; }
`;
