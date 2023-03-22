import { useEffect } from "react"
import { useMeetingManager } from "react-18-amazon-chime-js-sdk"
// import { useChimeMicrophone } from "react-18-amazon-chime-js-sdk"

export const SelectDriverView = () => {

    // const microphone = useChimeMicrophone()

    // useEffect(() => {
    //     microphone?.fetchMicrophones()
    // }, [])
    const meeting = useMeetingManager()

    console.log(meeting)

    return (
        <div>

            Driver selection
            {/* { microphone?.isSettingMicrophone
                ? <div>Loading microphones</div>
                : microphone?.microphones.map((m) => (
                    <div key={m.deviceId}>
                        { m.label }
                    </div>
                ))
            } */}
        </div>
    )
}