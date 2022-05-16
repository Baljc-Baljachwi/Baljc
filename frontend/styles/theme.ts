import { DefaultTheme } from "styled-components";

const size = {
  mobileS: "425px",
  mobile: "768px",
  tablet: "1024px",
  desktop: "1440px",
};

export const theme: DefaultTheme = {
  breakPoint: "769px",

  color: {
    main: "#18A0FB",
    backgroundColor: "#f8f9fa",
    black: "#1e1f1d",
    yellow: "#edb83c",
    orange: "#eb7952",
    gray: "#6e6e6e",
    gray_background: "#f5f5f5",
  },
  size: {
    mobileS: `(max-width:${size.mobileS})`,
    mobile: `(max-width:${size.mobile})`,
    tablet: `(max-width:${size.tablet})`,
    desktop: `(max-width:${size.desktop})`,
  },
  container: {
    maxWidth: "1160px",
    paddingLeftRight: "60px",
  },
};
