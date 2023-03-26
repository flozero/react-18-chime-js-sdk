import { ReactNode } from "react";
import { Clock } from "../../icons";
import { StyledLateMessage } from "./Styled";

export const LateMessage = ({ children }: { children: ReactNode }) => (
	<StyledLateMessage>
		<Clock />
		{children}
	</StyledLateMessage>
);