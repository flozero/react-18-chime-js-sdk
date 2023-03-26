import { HTMLAttributes } from "react";

import { BaseProps } from "../Base";
import { StyledPopOverSeparator } from "./Styled";

export interface PopOverSeparatorProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "css">,
    BaseProps {}

export const PopOverSeparator = (props: PopOverSeparatorProps) => (
	<StyledPopOverSeparator data-testid="popover-separator" {...props} />
);