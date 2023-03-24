import { MeetingSessionConfiguration, VideoPriorityBasedPolicy, VideoPriorityBasedPolicyConfig } from "amazon-chime-sdk-js"
import { useEffect } from "react"
import { useMeetingManager, useLogger, useMeetingEvent, useAudioVideo } from "react-18-amazon-chime-js-sdk"
import { getAttendee, PromiseAttendee } from "../mocks/getAttendee"
import { AttendeesListView } from "./AttendeesList"
import { DevicesListView } from "./DevicesList"
import { TilesVideoView } from "./TileVideo"

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
    const audioVideo = useAudioVideo()
    const meetingEvent = useMeetingEvent();

    const joinMeeting = async () => {
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
            meetingSessionConfiguration.attendeePresenceTimeoutMs = 120;
            
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

    useEffect(() => {
        if (audioVideo) {
            console.log("===> audioVideo", audioVideo)
            // audioVideo.addObserver(...);
        }
    }, [audioVideo])

    useEffect(() => {
        if (meetingEvent) {
            console.log("===> meetingEvent", meetingEvent)
        }
    }, [meetingEvent])

    return (
        <div>
            <DevicesListView />
            <button onClick={() => joinMeeting()}>Join</button>
            <AttendeesListView />
            <TilesVideoView />
        </div>
    )
}