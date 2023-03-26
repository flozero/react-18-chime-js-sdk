import { useCallback, useEffect, useState } from "react";

import { useAudioVideo } from "../../providers/AudioVideoProvider";

export const useToggleLocalMute = () => {
	const audioVideo = useAudioVideo();
	const [muted, setMuted] = useState<boolean>(
		() => audioVideo?.realtimeIsLocalAudioMuted() || false
	);

	useEffect(() => {
		const muteUnmutecallback = (localMuted: boolean): void => {
			setMuted(localMuted);
		};

		audioVideo?.realtimeSubscribeToMuteAndUnmuteLocalAudio(muteUnmutecallback);
		setMuted(audioVideo?.realtimeIsLocalAudioMuted() || false);

		return (): void => {
			audioVideo?.realtimeUnsubscribeToMuteAndUnmuteLocalAudio(
				muteUnmutecallback
			);
		};
	}, [audioVideo]);

	const toggleMute = useCallback(() => {
		if (muted) {
			audioVideo?.realtimeUnmuteLocalAudio();
		} else {
			audioVideo?.realtimeMuteLocalAudio();
		}
	}, [muted, audioVideo]);

	return { muted, toggleMute };
}