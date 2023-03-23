import { ReactNode } from "react";

import { AudioInputProvider, useAudioInputs } from "./AudioInputProvider";
import { AudioOutputProvider, useAudioOutputs } from "./AudioOutputProvider";
import { useVideoInputs, VideoInputProvider } from "./VideoInputProvider";

const DevicesProvider = ({ children } : { children: ReactNode }) => (
	<AudioInputProvider>
		<AudioOutputProvider>
			<VideoInputProvider>
				{ children }
			</VideoInputProvider>
		</AudioOutputProvider>
	</AudioInputProvider>
);

export { DevicesProvider, useAudioInputs, useAudioOutputs, useVideoInputs };
