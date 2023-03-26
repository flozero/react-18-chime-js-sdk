import { HTMLAttributes } from "react";

import { BaseProps } from "../../Base";
import { StyledChannelList } from "./Styled";

export interface ChannelListProps
  extends Omit<HTMLAttributes<HTMLUListElement & HTMLLIElement>, "css">,
    BaseProps {}

export const ChannelList = (props : ChannelListProps) => {
	return (
		<StyledChannelList {...props} data-testid="channel-list">
			{props.children}
		</StyledChannelList>
	);
};
