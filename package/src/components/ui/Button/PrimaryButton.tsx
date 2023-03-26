import { forwardRef } from "react";

import { Button, ButtonProps } from ".";

export const PrimaryButton = forwardRef(
	(props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => (
		<Button variant="primary" {...props} />
	)
);