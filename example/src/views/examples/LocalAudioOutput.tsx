import { useLocalAudioOutput } from "react-18-amazon-chime-js-sdk";

export const LocalAudioOutputView = () => {

    const { isAudioOn, toggleAudio } = useLocalAudioOutput();

    return (
        <div>
            <div>
                {isAudioOn
                ? 'Meeting audio output is on'
                : 'Meeting audio output is off'}
            </div>
            <button onClick={toggleAudio}>Toggle Local Audio Output</button>
        </div>
    )
}