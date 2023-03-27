import { useRemoteVideoTileState } from "react-18-amazon-chime-js-sdk"

export const TilesVideoView = () => {
    const { tiles } = useRemoteVideoTileState()
    const videos = tiles.map(tileId => <div>{tileId}</div>);

    return (
        <>
            <h1>tiles</h1>
            {videos}
        </>
    )
}
