import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { LocalAudioOutputContextType } from "../../types";
import { useAudioVideo } from "../AudioVideoProvider";
import { useLogger } from "../LoggerProvider";

const Context = createContext<LocalAudioOutputContextType | null>(null);

export const LocalAudioOutputProvider = ({ children }: { children: ReactNode }) => {
	const logger = useLogger();
	const audioVideo = useAudioVideo();
	const [isAudioOn, setIsAudioOn] = useState(true);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (!audioVideo) {
			return;
		}

		if (audioRef.current) {
			(async (element: HTMLAudioElement) => {
				try {
					await audioVideo.bindAudioElement(element);
				} catch (e) {
					logger.error(`Failed to bind audio element. ${e}`);
				}
			})(audioRef.current);
		}
		return (): void => {
			audioVideo.unbindAudioElement();
			setIsAudioOn(true);
		};
	}, [audioVideo]);

	const toggleAudio = useCallback((): void => {
		if (!audioRef.current) {
			return;
		}
		setIsAudioOn(!isAudioOn);
		if (isAudioOn) {
			audioVideo?.unbindAudioElement();
		} else {
			(async (element: HTMLAudioElement) => {
				try {
					await audioVideo?.bindAudioElement(element);
				} catch (e) {
					logger.error(`Failed to bind audio element. ${e}`);
				}
			})(audioRef.current);
		}
	}, [audioRef, audioVideo, isAudioOn]);

	const value = useMemo(
		() => ({ isAudioOn, toggleAudio }),
		[isAudioOn, toggleAudio]
	);

	return (
		<Context.Provider value={value}>
			{children}
			<audio ref={audioRef} style={{ display: "none" }} />
		</Context.Provider>
	);
};

export const useLocalAudioOutput = (): LocalAudioOutputContextType => {
	const context = useContext(Context);
	if (!context) {
		throw new Error(
			"useLocalAudioOutput must be used within LocalAudioOutputProvider"
		);
	}
	return context;
};
