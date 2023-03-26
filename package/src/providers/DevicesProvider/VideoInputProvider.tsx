import { DeviceChangeObserver, VideoInputDevice } from "amazon-chime-sdk-js";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { VideoInputContextType } from "../../types";
import { useAudioVideo } from "../AudioVideoProvider";
import { useLogger } from "../LoggerProvider";
import { useMeetingManager } from "../MeetingProvider";

const Context = createContext<VideoInputContextType | null>(null);

export const VideoInputProvider = ({ children }: { children: ReactNode }) => {
	const logger = useLogger();
	const audioVideo = useAudioVideo();
	const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
	const meetingManager = useMeetingManager();
	const [selectedVideoInputDevice, setSelectedVideoInputDevice] = useState<
    VideoInputDevice | undefined
  >(meetingManager.selectedVideoInputDevice);

	useEffect(() => {
		meetingManager.subscribeToSelectedVideoInputDevice(
			setSelectedVideoInputDevice
		);

		return (): void => {
			meetingManager.unsubscribeFromSelectedVideoInputDevice(
				setSelectedVideoInputDevice
			);
		};
	}, []);

	useEffect(() => {
		let isMounted = true;

		const observer: DeviceChangeObserver = {
			videoInputsChanged: (newVideoInputs: MediaDeviceInfo[]) => {
				logger.info("VideoInputProvider - video inputs updated");
				setVideoInputs(newVideoInputs);
			},
		};

		async function initVideoInput(): Promise<void> {
			if (!audioVideo) {
				return;
			}

			const devices = await audioVideo.listVideoInputDevices();

			if (isMounted) {
				setVideoInputs(devices);
				audioVideo.addDeviceChangeObserver(observer);
			}
		}

		const callback = (): void => {
			initVideoInput();
		};

		meetingManager.subscribeToDeviceLabelTrigger(callback);

		initVideoInput();

		return () => {
			isMounted = false;
			audioVideo?.removeDeviceChangeObserver(observer);
			meetingManager.unsubscribeFromDeviceLabelTrigger(callback);
		};
	}, [audioVideo]);

	const contextValue: VideoInputContextType = useMemo(
		() => ({
			devices: videoInputs,
			selectedDevice: selectedVideoInputDevice,
		}),
		[videoInputs, selectedVideoInputDevice]
	);

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useVideoInputs = (): VideoInputContextType => {
	const context = useContext(Context);

	if (!context) {
		throw new Error("useVideoInputs must be used within VideoInputProvider");
	}

	return context;
};