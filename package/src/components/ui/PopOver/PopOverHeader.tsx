import { HTMLAttributes, ReactNode } from "react";

import { BaseProps } from "../Base";
import { StyledPopOverHeader } from "./Styled";

export interface PopOverHeaderProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "css">,
    BaseProps {
  /** The title of the PopOver menu header. */
  title?: string;
  /** The subtitle of the PopOver menu header. */
  subtitle?: string | ReactNode;
  /** The source of the PopOver menu image. */
  imgSrc?: string;
}

export const PopOverHeader = ({
	title,
	subtitle,
	imgSrc,
	...rest
}: PopOverHeaderProps) => (
	<StyledPopOverHeader data-testid="popover-header" {...rest}>
		{imgSrc && <img src={imgSrc} alt={title} />}
		{title && <p className="ch-title">{title}</p>}
		{subtitle && <p className="ch-subtitle">{subtitle}</p>}
	</StyledPopOverHeader>
);