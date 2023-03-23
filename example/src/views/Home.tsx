import { MeetingSessionConfiguration, VideoPriorityBasedPolicy, VideoPriorityBasedPolicyConfig } from "amazon-chime-sdk-js"
import { useEffect } from "react"
import { useMeetingManager, useLogger, useMeetingEvent, useAudioVideo, useVideoInputs, useRosterState } from "react-18-amazon-chime-js-sdk"
import { getAttendee, PromiseAttendee } from "../mocks/getAttendee"

declare global {
    interface Window {
        attendee: string
        meeting: string
    }
}

export const HomeView = () => {
    const meetingManager = useMeetingManager()
    meetingManager.getAttendee  = getAttendee
    const { devices, selectedDevice } = useVideoInputs();
    const items = devices.map((device) => <li>{device.label}</li>);

    const logger = useLogger()
    const audioVideo = useAudioVideo()
    const meetingEvent = useMeetingEvent();
    const { roster } = useRosterState()
    const attendees = Object.values(roster);

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

    const attendeeItems = attendees.map(attendee => {
        const { chimeAttendeeId, name } = attendee;
        return (
          <div key={chimeAttendeeId}>
            {chimeAttendeeId}
            {name}
          </div>
        );
      });

    // const MeetingEventReceiver = () => {
    //     const meetingEvent = useMeetingEvent();
    //     console.log('Received a meeting event', meetingEvent);
    //     return null;
    // };

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
            {/* <MeetingEventReceiver /> */}
            <button onClick={() => joinMeeting()}>Join</button>
            {attendeeItems}
            <div>
                <p> Current Selected Device: { selectedDevice } </p>
                <p>Devices</p>
                <ul>{items}</ul>
            </div>
        </div>
    )
}