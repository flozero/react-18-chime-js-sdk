import { AudioInputControl, AudioOutputControl, ContentShareControl, ControlBar, ControlBarButton, Phone, VideoInputControl } from "react-18-amazon-chime-js-sdk";

export const AppControlBar = () => {

    const hangUpButtonProps = {
        icon: <Phone />,
        onClick: () => console.log('End meeting'),
        label: 'End'
    };

    return (
    <ControlBar showLabels layout="bottom">
        <AudioInputControl />
        <AudioOutputControl />
        <VideoInputControl />
        <ContentShareControl />
        <ControlBarButton {...hangUpButtonProps} />
    </ControlBar>
    );
}
