import React from "react";
import { Check } from "../icons";
import { StyledPopOverItem } from "./Styled";

export type PopOverItemType = "a" | "button";

export interface PopOverItemProps {
  /** The callback fired when the item is clicked. */
  onClick?: () => void;
  /** Whether or not the item is checked. */
  checked?: boolean;
  /** The elements that populate the content of the item. */
  children?: React.ReactElement<any> | React.ReactElement<any>[];
  /** Whether or not the item is disabled. */
  disabled?: boolean;
  /** Defines the href attribute if the item is rendered as an `a` tag. */
  href?: string;
  /** Defines which tag will the item be rendered as, it defaults to `button`. */
  as?: PopOverItemType;
  /** Whether or not the item has a border. */
  border?: boolean;
  /* Unique identifier to target element */
  testId?: string;
}

export const PopOverItem = ({
	as = "button",
	children,
	checked,
	testId = "popover-item",
	...rest
}: PopOverItemProps) => {
	const Tag = as;
	return (
		<StyledPopOverItem data-testid={testId}>
			{checked && <Check className="ch-check" data-testid="popover-check" />}
			<Tag className="ch-content" {...rest}>
				{children}
			</Tag>
		</StyledPopOverItem>
	);
};
