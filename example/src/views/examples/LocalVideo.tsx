import { useLocalVideo } from "react-18-amazon-chime-js-sdk";

export const LocalVideoView = () => {
    const { tileId, isVideoEnabled, hasReachedVideoLimit, toggleVideo } = useLocalVideo();
    return (
        <>
            <p>Tile ID: {tileId}</p>
        
            <p>
            {isVideoEnabled ? 'LocalVideo is enabled' : 'LocalVideo is disabled'}
            </p>
        
            <p>
            {hasReachedVideoLimit ? 'Video limit reached' : 'Video limit not reached'}
            </p>
        
            <button onClick={toggleVideo}>
            {isVideoEnabled ? 'Stop your video' : hasReachedVideoLimit ?
            'Has reached the video limit, can not turn on video' : 'Start your video'}
            </button>
        </>
    );
};