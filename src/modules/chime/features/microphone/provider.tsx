import { ConsoleLogger, DefaultDeviceController, LogLevel } from "amazon-chime-sdk-js"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useChime } from "../../provider";

const ChimeMicrophoneContext = createContext<{
    microphones: MediaDeviceInfo[];
    fetchMicrophones: () => {};
    selectedMicrophone: null | string;
    setSelectedMicrophone: Dispatch<SetStateAction<string | null>>;
    isSettingMicrophone: boolean
} | null>(null)

export const useChimeMicrophone = () => useContext(ChimeMicrophoneContext)

export const ChimeMicrophoneProvider = ({ children } : { children: ReactNode }) => {

    const chime = useChime()
    const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
    const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(null);
    const [isSettingMicrophone, setIsSettingMicrophone] = useState(false)

    async function fetchMicrophones() {
        setIsSettingMicrophone(true)
        const devices = await chime?.deviceController.listAudioInputDevices();
        setMicrophones([
            ...(devices as [])
        ])
        setIsSettingMicrophone(false)
        console.log(devices)
    }

    return (
        <ChimeMicrophoneContext.Provider value={{
            microphones,
            fetchMicrophones,
            selectedMicrophone,
            setSelectedMicrophone,
            isSettingMicrophone
        }}>
            { children }
        </ChimeMicrophoneContext.Provider>
    )
}