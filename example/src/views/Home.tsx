import { MeetingSessionConfiguration, VideoPriorityBasedPolicy, VideoPriorityBasedPolicyConfig } from "amazon-chime-sdk-js"
import { useEffect, useState } from "react"
import { useMeetingManager, useLogger, Heading, Button, Flex, useMeetingStatus, MeetingStatus } from "react-18-amazon-chime-js-sdk"
import { AppControlBar } from "../components/ControlBar"
import { getAttendee, PromiseAttendee } from "../mocks/getAttendee"
import { AttendeesListView } from "./examples/AttendeesList"
import { ContentshareView } from "./examples/ContentShare"
import { DevicesListView } from "./examples/DevicesList"
import { FeaturedVideoTileView } from "./examples/FeaturedVideoTile"
import { LocalAudioOutputView } from "./examples/LocalAudioOutput"
import { LocalVideoView } from "./examples/LocalVideo"
import { TilesVideoView } from "./examples/TileVideo"

import "./Home.css"
import { InMeeting } from "./InMeeting"

declare global {
    interface Window {
        attendee: string
        meeting: string
    }
}

export const HomeView = () => {
    const meetingManager = useMeetingManager()
    meetingManager.getAttendee  = getAttendee

    const logger = useLogger()
    // const audioVideo = useAudioVideo()
    // const meetingEvent = useMeetingEvent();

    const joinMeeting = async () => {
        setIsJoining(true)
        if (!meetingManager.getAttendee) throw new Error("no get Attendee defined")
        try {
            const data: PromiseAttendee = await meetingManager.getAttendee("")
            // both value are objects that represent both meeting and attendee
            const meetingSessionConfiguration = new MeetingSessionConfiguration(
                data.meeting,
                data.attendee
            )
            
            // Amount of time for the current attendee the system have to wait to consider that the connection failed
            // usefull for poor network or slow devices
            // meetingSessionConfiguration.attendeePresenceTimeoutMs = 120;
            
            // not sure yet how we should use this 
            meetingSessionConfiguration.videoDownlinkBandwidthPolicy = new VideoPriorityBasedPolicy(
                logger,
                VideoPriorityBasedPolicyConfig.UnstableNetworkPreset,
            );
            
            await meetingManager.join(meetingSessionConfiguration)
    
            // At this point you could let users setup their devices, or by default
            // the SDK will select the first device in the list for the kind indicated
            // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)

            // Start the `MeetingSession` to join the meeting
            await meetingManager.start();

        } catch (e) {
            console.error("error starting the session", e)
        }
    }

    // useEffect(() => {
    //     if (audioVideo) {
    //         console.log("===> audioVideo", audioVideo)
    //         // audioVideo.addObserver(...);
    //     }
    // }, [audioVideo])

    // useEffect(() => {
    //     if (meetingEvent) {
    //         console.log("===> meetingEvent", meetingEvent)
    //     }
    // }, [meetingEvent])

    const meetingStatus = useMeetingStatus()
    const [ isJoining, setIsJoining ] = useState(false)

    const meetingViewBaseOnStatus = (status: MeetingStatus) => {
        let render = <div>none</div>
        switch (status) {
            case MeetingStatus.Loading:
                render = 
                    <div>
                        <Heading level={3} css="margin-bottom: 1rem;">
                            You are about to join the session
                        </Heading>
                        <div className="SpinnerContainer">
                            <div className="SpinnerContainer__spinner"></div>
                        </div>
                    </div>
                break;
            case MeetingStatus.Succeeded:
                render = <InMeeting />   
                break;
            case MeetingStatus.Ended:
                render =
                <div>
                    Meeting ended
                </div>
                break;
            default:
                render = 
                    <div>
                        { status }
                    </div>
                break;
        }

        return render
    }


    return (
        <Flex layout="fill-space">
            <div style={{
                height: "calc(100% - 5rem)",
                width: "100%",
            }}>
                <Flex layout="fill-space-centered">
                    { !isJoining 
                        ? <div>
                            <Button label="Join session" onClick={joinMeeting}/>
                        </div>
                        : meetingViewBaseOnStatus(meetingStatus)
                    }
                </Flex>
            </div>
            <AppControlBar />
        </Flex>
    )
}