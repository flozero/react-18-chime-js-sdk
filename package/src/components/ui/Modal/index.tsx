import { createContext, HTMLAttributes, ReactNode, useContext, useEffect, useRef } from "react";

import { KEY_CODES } from "../../../constants";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {trapFocus} from "../../../utils/trap-focus";
import { BaseProps } from "../Base";
import {Portal} from "../Portal";
import { StyledModal } from "./Styled";

export type ModalSize = "md" | "lg" | "fullscreen";

const ModalContext = createContext<any>({
	onClose: Function,
	labelID: "",
	dismissible: true,
});

export const useModalContext = () => {
	return useContext(ModalContext);
};

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "css">,
    BaseProps {
	children: ReactNode;
  /** The callback fired when the modal is closed. */
  onClose?: () => void;
  /** The size of the modal. */
  size?: ModalSize;
  /** The rootId of the modal. */
  rootId?: string;
  /** Optional prop to prevent the modal from closing. */
  dismissible?: boolean;
}

export const Modal = ({
	size = "md",
	onClose = () => null,
	children,
	rootId,
	dismissible = true,
	...rest
}: ModalProps) => {
	const contentEl = useRef<HTMLDivElement>(null);
	const mainEl = useRef<HTMLDivElement>(null);

	const { 
		labelID,
	} = useModalContext()

	dismissible && useClickOutside(mainEl, onClose);

	useEffect(() => {
		// return focus to the element that triggered the
		// modal when the modal closes
		const activeNode: any = document.activeElement;
		return () => !!activeNode && activeNode.focus();
	}, []);

	useEffect(() => {
		// ensure that the focus event fires after Portal render is complete
		setTimeout(() => mainEl.current?.focus(), 0);

		const onKeydown = (e: any) => {
			if (e.keyCode === KEY_CODES.ESCAPE && onClose) {
				onClose();
			} else {
				trapFocus(e, contentEl.current as HTMLElement);
			}
		};

		window.addEventListener("keydown", onKeydown);
		return () => window.removeEventListener("keydown", onKeydown);
	}, []);

	return (
		<Portal rootId={rootId}>
			<ModalContext.Provider value={ModalContext}>
				<StyledModal
					{...rest}
					size={size}
					onClose={onClose}
					ref={contentEl}
					data-testid="modal"
				>
					<section
						aria-modal
						ref={mainEl}
						role="dialog"
						tabIndex={0}
						aria-labelledby={labelID}
					>
						{children}
					</section>
				</StyledModal>
			</ModalContext.Provider>
		</Portal>
	);
};
