import { ConsoleLogger, DefaultDeviceController, DeviceController, LogLevel } from "amazon-chime-sdk-js"
import { createContext, ReactNode, useContext, useState } from "react"
import { ChimeMicrophoneProvider } from "./features/microphone/provider"

const ChimeContext = createContext<{
    deviceController: DeviceController,
    logger: ConsoleLogger
} | null>(null)

export const useChime = () => useContext(ChimeContext)

export const ChimeProvider = ({ children }: { children: ReactNode }) => {

	const [logger, setLogger] = useState<ConsoleLogger>(new ConsoleLogger("ReactChimeSdk", LogLevel.ERROR))
	const [deviceController, setDeviceController] = useState<DeviceController>(new DefaultDeviceController(logger))

	return (
		<ChimeContext.Provider value={{
			deviceController,
			logger
		}}>
			<ChimeMicrophoneProvider>
				{ children }
			</ChimeMicrophoneProvider>
		</ChimeContext.Provider>
	)
}


