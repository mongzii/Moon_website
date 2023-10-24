import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  //   red: "#E51013",
  gray: {
    lighter: "#B4B4B3",
    darker: "#7D7C7C",
  },

  red: "#b94646",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2f",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};

//화면사이즈
export const size: DefaultTheme = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1025px",
};

//콘텐츠 넓이 관련
export const widthSize: DefaultTheme = {
  contentMax: "1250px",
};

// 화면 변경 지점
export const breakpoints: DefaultTheme = {
  mobileMax: `screen and (max-width: ${size.mobile})`,
  tabletMax: `screen and (max-width: ${size.tablet})`,
  desktopMin: `screen and (max-width: ${size.desktop})`,
};
