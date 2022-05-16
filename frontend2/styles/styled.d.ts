import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakPoint: string;

    color: {
      main: string;
      backgroundColor: string;
      black: string;
      yellow: string;
      orange: string;
      gray: string;
      gray_background: string;
    };
    size: {
      mobileS: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
    container: {
      maxWidth: string;
      paddingLeftRight: string;
    };
  }
}
