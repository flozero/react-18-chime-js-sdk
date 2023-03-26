import React, { ReactNode } from "react";
import { GridProps, SpaceProps } from "styled-system";

import { StyledCell } from "./Styled";

export interface CellProps extends SpaceProps, GridProps {
  tag?: string;
  css?: string;
  className?: string;
  children: ReactNode;
}

export const Cell: React.FC<CellProps> = ({ className, children, ...rest }) => (
	<StyledCell className={className || ""} {...rest}>
		{children}
	</StyledCell>
);
