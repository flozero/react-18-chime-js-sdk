import { ReactNode } from "react"
import { VideoGrid, VideoTile, VideoTileGrid } from "react-18-amazon-chime-js-sdk"

export const InMeeting = () => {
    return (
        <VideoTileGrid 
            noRemoteVideoView={<div>no video</div>}
            layout="standard"
        />
        // <VideoGrid>
        //     <VideoTile
        //         style={{
        //             border: '1px solid grey',
        //             gridArea: '',
        //         }}
        //         nameplate="Florent"
        //     />
        //     <VideoTile
        //         style={{
        //             border: '1px solid grey',
        //             gridArea: '',
        //         }}
        //         nameplate="Michell"
        //     />
        // </VideoGrid>
    )
}