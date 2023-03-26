import { ReactNode } from "react";
import { BaseProps, FocusableProps } from "../Base";
import { StyledRoster } from "./Styled";

export interface RosterProps extends BaseProps, FocusableProps {
  children: ReactNode
}

export const Roster: React.FC<RosterProps> = ({ children, ...rest }: RosterProps) => {
	return <StyledRoster {...rest}>{children}</StyledRoster>;
};
