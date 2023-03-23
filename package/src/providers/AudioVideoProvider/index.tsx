import { AudioVideoFacade } from "amazon-chime-sdk-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useMeetingManager } from "../MeetingProvider";

type AudioVideoValue = AudioVideoFacade | null;

export const AudioVideoContext = createContext<AudioVideoValue>(null);

export const AudioVideoProvider= ({ children } : { children: ReactNode }) => {
	const meetingManager = useMeetingManager();
	const [audioVideo, setAudioVideo] = useState<AudioVideoValue>(null);

	useEffect(() => {
		function audioVideoUpdateCb(av: AudioVideoValue) {
			setAudioVideo(av);
		}

		meetingManager.subscribeToAudioVideo(audioVideoUpdateCb);

		return () => meetingManager.unsubscribeFromAudioVideo(audioVideoUpdateCb);
	}, []);

	return (
		<AudioVideoContext.Provider value={audioVideo}>
			{children}
		</AudioVideoContext.Provider>
	);
};

export const useAudioVideo = (): AudioVideoValue => useContext(AudioVideoContext);