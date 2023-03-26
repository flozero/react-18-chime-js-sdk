import { ReactNode } from "react";

import { AudioInputProvider, useAudioInputs } from "./AudioInputProvider";
import { AudioOutputProvider, useAudioOutputs } from "./AudioOutputProvider";
import { useVideoInputs, VideoInputProvider } from "./VideoInputProvider";

interface Props {
	children: ReactNode;
	onDeviceReplacement: any
}

export const DevicesProvider = ({
	children,
	onDeviceReplacement,
}: Props) => (
	<AudioInputProvider onDeviceReplacement={onDeviceReplacement}>
		<AudioOutputProvider>
			<VideoInputProvider>{children}</VideoInputProvider>
		</AudioOutputProvider>
	</AudioInputProvider>
);

export { useAudioInputs, useAudioOutputs, useVideoInputs };
