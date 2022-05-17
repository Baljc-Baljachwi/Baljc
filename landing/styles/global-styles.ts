import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -ms-overflow-style: none;
    scrollbar-width: none; 
  }
  html {
    font-size: 62.5%;
    color: #3D3D3D;
  }
  html, body, #__next {
    height: 100%;
  }
  body { font-family: 'Noto Sans KR', sans-serif;
  background-color: #ffffff;
  margin: 0 auto;

  @media screen and (max-width: 512px) {
    background-color: #2e437a;
  }
}
::-webkit-scrollbar {
  display: none;
}
.normal		{ font-weight: 400 }
.bold		  { font-weight: 700 }
.bolder		{ font-weight: 800 }
.light		{ font-weight: 300 }
a { cursor: pointer; text-decoration: none; }
`;
