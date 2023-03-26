import { BaseProps, FocusableProps } from "../Base";
import { IconButton } from "../Button/IconButton";
import { Remove } from "../icons";
import { StyledHeader } from "./Styled";

export interface NavbarHeaderProps extends BaseProps, FocusableProps {
  /** The title of the navigation bar menu */
  title: string;
  /** The callback fired when the navigation bar is closed */
  onClose?: () => void;
}

export const NavbarHeader = (
	props: NavbarHeaderProps
) => (
	<StyledHeader {...props}>
		<span className="ch-title">{props.title}</span>
		{props.onClose && (
			<IconButton
				className="ch-btn-close"
				label="Close"
				onClick={props.onClose}
				icon={<Remove />}
			/>
		)}
	</StyledHeader>
);