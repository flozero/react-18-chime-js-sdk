import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import lightTheme from "./light";

export { lightTheme } from "./light";
export { darkTheme } from "./dark";

export { StyledReset } from "./StyledReset";
export { GlobalStyles } from "./GlobalStyles";

export const AppThemeProvider = ( { children, theme = lightTheme } : { 
    children: ReactNode,
    theme?: any
}) => {

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	)
}