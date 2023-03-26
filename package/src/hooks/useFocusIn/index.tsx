import { RefObject, useEffect, useRef, useState } from "react";

export const useFocusIn = (el: RefObject<any>, delay = 3000) => {
	const timeoutRef: any = useRef(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	useEffect(() => {
		if (!el.current) {
			return;
		}

		const onFocusIn = (): void => {
			clearTimeout(timeoutRef.current);
			setIsFocused(true);
		};

		const onFocusOut = (): void => {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				setIsFocused(false);
			}, delay);
		};

		el.current.addEventListener("focusin", onFocusIn);
		el.current.addEventListener("focusout", onFocusOut);

		return (): void => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			el.current?.removeEventListener("focusin", onFocusIn);
			el.current?.removeEventListener("focusout", onFocusOut);
		};
	}, [el]);

	return { isFocused };
}