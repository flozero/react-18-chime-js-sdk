import { RefObject, useEffect, useRef, useState } from "react";

export const useMouseMove = (el: RefObject<any>, delay = 3000) => {
	const timeoutRef: any = useRef(null);
	const [isMouseMoving, setIsMouseActive] = useState<boolean>(false);

	useEffect(() => {
		if (!el.current) {
			return;
		}

		const onMouseMove = () => {
			clearTimeout(timeoutRef.current);
			setIsMouseActive(true);
			timeoutRef.current = setTimeout(() => {
				setIsMouseActive(false);
			}, delay);
		};

		el.current.addEventListener("mousemove", onMouseMove);

		return (): void => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			el.current?.removeEventListener("mousemove", onMouseMove);
		};
	}, [el]);

	return { isMouseMoving };
}