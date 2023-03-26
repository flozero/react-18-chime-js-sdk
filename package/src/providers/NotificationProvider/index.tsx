import React, { Dispatch, ReactNode, useContext, useReducer } from "react";

import {
	Action,
	initialState,
	reducer,
	StateType,
} from "./state";

const StateContext = React.createContext<StateType>(initialState);
const DispatchContext = React.createContext<Dispatch<Action>>(() => null);

export const NotificationProvider = ({ children } : { children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

export const useNotificationState = () => {
	const state = useContext(StateContext);
	return state;
};

export const useNotificationDispatch = () => {
	const dispatch = useContext(DispatchContext);
	return dispatch;
};

export * from "./state"
