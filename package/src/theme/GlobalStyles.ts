/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createGlobalStyle } from "styled-components";

import { StyledReset } from "./StyledReset";

export const GlobalStyles = createGlobalStyle`
  ${StyledReset};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: ${(props: any) => props.theme.fontSizes.baseFontSize};
    font-family: ${props => props.theme.fonts.body};;
    background-color: ${props => props.theme.globalStyle.bgd};
    color: ${props => props.theme.globalStyle.text};
    min-height: 100%;
  }
`;

export default GlobalStyles;
