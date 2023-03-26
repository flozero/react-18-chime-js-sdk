import {  HTMLAttributes } from "react";
import { useModalContext } from ".";

import { BaseProps } from "../Base";
import { IconButton } from "../Button/IconButton";
import { Remove } from "../icons";
import { StyledModalHeader } from "./Styled";

export interface ModalHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "css">,
    BaseProps {
  /** The title of the header in the modal. */
  title: string;
  /** Whether or not the close icon is shown on the modal. */
  displayClose?: boolean;
}

export const ModalHeader = ({
	tag: Tag = "div",
	displayClose = true,
	title,
	...rest
}: ModalHeaderProps) => {
	const context = useModalContext();
	const handleClick = () => {
		return context && context.onClose();
	};

	return (
		<StyledModalHeader {...rest}>
			<Tag className="ch-title" id={context.labelID}>
				{title}
			</Tag>

			{displayClose && context?.dismissible && (
				<span className="ch-close-button">
					<IconButton label="Close" icon={<Remove />} onClick={handleClick} />
				</span>
			)}
		</StyledModalHeader>
	);
};