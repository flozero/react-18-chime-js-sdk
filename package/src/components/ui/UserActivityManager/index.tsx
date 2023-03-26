import { ReactNode } from "react";

import { useUserActivityState } from "../../../providers/UserActivityProvider";
import { StyledUserActivityManager } from "./Styled";

export interface Props {
  isActive?: boolean | null;
  children: ReactNode
}

export const UserActivityManager = ({ children }: Props) => {
	const { isUserActive } = useUserActivityState();
	return (
		<StyledUserActivityManager
			isActive={isUserActive}
			className={`${isUserActive ? "ch-active" : ""}`}
		>
			{children}
		</StyledUserActivityManager>
	);
};

UserActivityManager.displayName = "UserActivityManager";