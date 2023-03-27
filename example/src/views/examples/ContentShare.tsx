import { useContentShareControls, useContentShareState } from "react-18-amazon-chime-js-sdk";

export const ContentshareView = () => {
    const { isLocalUserSharing } = useContentShareState();
    const { toggleContentShare } = useContentShareControls();

    const toggleContentShareCustom = async () => {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });
        toggleContentShare(mediaStream);
    };

    return (
        <>
            {isLocalUserSharing ? <div>Sharing</div> : <div>Not sharing</div> }
            <button onClick={toggleContentShareCustom}>Toggle content share</button>
        </>
    )
}