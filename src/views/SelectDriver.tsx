import { useEffect } from "react"
import { useChimeMicrophone } from "../modules/chime/features/microphone/provider"
export const SelectDriverView = () => {

    const microphone = useChimeMicrophone()

    useEffect(() => {
        microphone?.fetchMicrophones()
    }, [])

    return (
        <div>
            Driver selection
            { microphone?.isSettingMicrophone
                ? <div>Loading microphones</div>
                : microphone?.microphones.map((m) => (
                    <div key={m.deviceId}>
                        { m.label }
                    </div>
                ))
            }
        </div>
    )
}