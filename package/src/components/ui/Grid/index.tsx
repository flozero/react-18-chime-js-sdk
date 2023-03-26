import { ReactNode } from "react";
import { GridProps as SSGridProps } from "styled-system";

import { BaseProps } from "../Base";
import { StyledGrid } from "./Styled";

export interface GridProps extends BaseProps, SSGridProps {
  /** Whether or not the grid is responsive to different window sizes. */
  responsive?: boolean;
  children: ReactNode;
}

export const Grid = ({
	className,
	tag,
	children,
	...rest
} : GridProps) => {
	return (
		<StyledGrid as={tag} className={className || ""} {...rest}>
			{children}
		</StyledGrid>
	);
};
