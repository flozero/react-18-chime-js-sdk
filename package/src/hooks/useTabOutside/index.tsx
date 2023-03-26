import { RefObject, useEffect } from "react";

export const useTabOutside = (
	ref: RefObject<HTMLElement>,
	onTabOutside: (e: KeyboardEvent) => void
) => {
	const isOutside = () => {
		return (
			!!ref.current &&
      !ref.current.contains(document.activeElement as HTMLElement)
		);
	};

	const keyUp = (e: KeyboardEvent) => {
		if (e.keyCode === 9 && isOutside()) {
			return onTabOutside(e);
		}
	};

	useEffect(() => {
		document.addEventListener("keyup", keyUp);
		return () => {
			document.removeEventListener("keyup", keyUp);
		};
	}),
	[onTabOutside];
}
