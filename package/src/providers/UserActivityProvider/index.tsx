import { createContext, ReactNode, useContext, useMemo, useRef } from "react";

import {useFocusIn} from "../../hooks/useFocusIn";
import {useMouseMove} from "../../hooks/useMouseMove";

interface UserActivityState {
  isUserActive: boolean | null;
}

export const UserActivityContext = createContext<UserActivityState | null>(
	null
);

export const UserActivityProvider = ({ children }: { children: ReactNode}) => {
	const ref = useRef<any>(null);
	const { isFocused } = useFocusIn(ref);
	const { isMouseMoving } = useMouseMove(ref);
	const isUserActive = isFocused || isMouseMoving;
	const value = useMemo(
		() => ({
			isUserActive,
		}),
		[isUserActive]
	);

	return (
		<div ref={ref}>
			<UserActivityContext.Provider value={value}>
				{children}
			</UserActivityContext.Provider>
		</div>
	);
};

export const useUserActivityState = (): UserActivityState => {
	const state = useContext(UserActivityContext);

	if (!state) {
		throw new Error(
			"useUserActivityState must be used within an UserActivityContextProvider"
		);
	}

	return state;
}