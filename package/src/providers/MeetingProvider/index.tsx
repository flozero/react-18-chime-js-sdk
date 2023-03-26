import { AudioInputDevice } from "amazon-chime-sdk-js";
import { createContext, ReactNode, useContext, useState } from "react";

import { AudioVideoProvider } from "../AudioVideoProvider";
import { ContentShareProvider } from "../ContentShareProvider";
import { DevicesProvider } from "../DevicesProvider";
import { FeaturedVideoTileProvider } from "../FeaturedVideoTileProvider";
import { LocalAudioOutputProvider } from "../LocalAudioOutputProvider";
import { LocalVideoProvider } from "../LocalVideoProvider";
import { useLogger } from "../LoggerProvider";
import { MeetingEventProvider } from "../MeetingEventProvider";
import { RemoteVideoTileProvider } from "../RemoteVideoTileProvider";
import { RosterProvider } from "../RosterProvider";
import MeetingManager from "./MeetingManager";

interface Props {
	children: ReactNode;
  onDeviceReplacement?: (
    nextDevice: string,
    currentDevice: AudioInputDevice
  ) => Promise<AudioInputDevice>;
  /** Pass a `MeetingManager` instance if you want to share this instance
   * across multiple different `MeetingProvider`s. This approach has limitations.
   * Check `meetingManager` prop documentation for more information.
   */
  meetingManager?: MeetingManager;
}

const MeetingContext = createContext<MeetingManager | null>(null);

export const MeetingProvider = ({
	onDeviceReplacement,
	meetingManager: meetingManagerProp,
	children,
} : Props) => {
	const logger = useLogger();
	const [meetingManager] = useState(
		() => meetingManagerProp || new MeetingManager(logger)
	);

	return (
		<MeetingContext.Provider value={meetingManager}>
			<MeetingEventProvider>
				<AudioVideoProvider>
					<DevicesProvider onDeviceReplacement={onDeviceReplacement}>
						<RosterProvider>
							<RemoteVideoTileProvider>
								<LocalVideoProvider>
									<LocalAudioOutputProvider>
										<ContentShareProvider>
											<FeaturedVideoTileProvider>
												{children}
											</FeaturedVideoTileProvider>
										</ContentShareProvider>
									</LocalAudioOutputProvider>
								</LocalVideoProvider>
							</RemoteVideoTileProvider>
						</RosterProvider>
					</DevicesProvider>
				</AudioVideoProvider>
			</MeetingEventProvider>
		</MeetingContext.Provider>
	);
};

export const useMeetingManager = (): MeetingManager => {
	const meetingManager = useContext(MeetingContext);

	if (!meetingManager) {
		throw new Error("useMeetingManager must be used within MeetingProvider");
	}

	return meetingManager;
};

export * from "./types"
