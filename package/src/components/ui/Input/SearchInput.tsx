import { forwardRef, Ref } from "react";

import Search from "../icons/Search";
import {Input, InputProps } from ".";

export const SearchInput = forwardRef(
	(props: InputProps, ref: Ref<HTMLInputElement>) => {
		const searchProps: InputProps = {
			...props,
			sizing: "sm",
			type: "search",
			leadingIcon: <Search data-testid="search-icon" />,
		};

		return <Input {...searchProps} ref={ref} />;
	}
);
