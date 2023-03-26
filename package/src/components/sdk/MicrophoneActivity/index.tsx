import { useEffect, useRef } from "react";

import {useAttendeeAudioStatus} from "../../../hooks/sdk/useAttendeeAudioStatus";
import { useAudioVideo } from "../../../providers/AudioVideoProvider";
import { MicVolumeIndicator } from "../../ui/MicVolumeIndicator";
import { BaseSdkProps } from "../Base";

interface Props extends BaseSdkProps {
  /** The Chime attendee ID */
  attendeeId: string;
}

export const MicrophoneActivity = ({
	attendeeId,
	...rest
} : Props) => {
	const audioVideo = useAudioVideo();
	const bgEl = useRef<HTMLDivElement>(null);
	const { signalStrength, muted } = useAttendeeAudioStatus(attendeeId);

	useEffect(() => {
		if (!audioVideo || !attendeeId || !bgEl.current) {
			return;
		}

		const callback = (
			_: string,
			volume: number | null,
			__: boolean | null,
			___: number | null
		) => {
			if (bgEl.current) {
				bgEl.current.style.transform = `scaleY(${volume})`;
			}
		};

		audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, callback);

		return () =>
			audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId, callback);
	}, [attendeeId]);

	return (
		<MicVolumeIndicator
			{...rest}
			ref={bgEl}
			muted={muted}
			signalStrength={signalStrength}
		/>
	);
};
