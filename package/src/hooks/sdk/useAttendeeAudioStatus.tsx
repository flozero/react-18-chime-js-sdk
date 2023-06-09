import { useEffect, useState } from "react";

import { useAudioVideo } from "../../providers/AudioVideoProvider";

export const useAttendeeAudioStatus = (attendeeId: string) => {
	const audioVideo = useAudioVideo();
	const [muted, setMuted] = useState(false);
	const [signalStrength, setSignalStrength] = useState(1);

	useEffect(() => {
		if (!audioVideo) {
			return;
		}

		const callback = (
			_: string,
			__: number | null,
			muted: boolean | null,
			signalStrength: number | null
		): void => {
			if (muted !== null) {
				setMuted(muted);
			}
			if (signalStrength !== null) {
				setSignalStrength(signalStrength);
			}
		};

		audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, callback);

		return () =>
			audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId, callback);
	}, [audioVideo, attendeeId]);

	return {
		muted,
		signalStrength,
	};
}