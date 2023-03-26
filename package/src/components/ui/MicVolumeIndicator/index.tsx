import { forwardRef, HTMLAttributes, Ref } from "react";

import { BaseProps } from "../Base";
import { Microphone } from "../icons";
import { StyledMicVolumeIndicator } from "./Styled";

export interface MicVolumeIndicatorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "css">,
    BaseProps {
  /* Whether or not the attendee is muted */
  muted?: boolean | undefined;
  /* The measure of an attendee's network connection on a scale of 0 to 1.
  A bad connection is .5 or below. */
  signalStrength: number | undefined;
}

export const MicVolumeIndicator = forwardRef(
	(
		{
			muted = false,
			signalStrength,
			className: propClassName,
			...rest
		}: MicVolumeIndicatorProps,
		bgRef: Ref<HTMLDivElement>
	) => {
		const poorConnection =
      signalStrength !== undefined && signalStrength <= 0.5;
		const className = propClassName
			? `${propClassName} ch-mic-volume-indicator`
			: "ch-mic-volume-indicator";

		return (
			<StyledMicVolumeIndicator
				className={className}
				signalStrength={signalStrength}
				muted={muted}
				{...rest}
			>
				<Microphone
					muted={muted}
					className="ch-mic-icon"
					poorConnection={poorConnection}
				/>
				<div className="ch-bg-volume-wrapper">
					<div
						ref={bgRef}
						className="ch-bg-volume-fill"
						data-testid="volume-fill"
					/>
				</div>
			</StyledMicVolumeIndicator>
		);
	}
);