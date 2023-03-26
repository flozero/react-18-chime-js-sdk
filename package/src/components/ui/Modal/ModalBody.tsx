import {  HTMLAttributes } from "react";

import { BaseProps } from "../Base";
import { StyledModalBody } from "./Styled";

interface ModalBodyProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "css">,
    BaseProps {}

export const ModalBody = ({ children, ...rest }: ModalBodyProps) => {
	return (
		<StyledModalBody data-testid="modal-body" {...rest}>
			{children}
		</StyledModalBody>
	);
};