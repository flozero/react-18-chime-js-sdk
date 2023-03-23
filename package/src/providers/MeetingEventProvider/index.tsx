import { EventAttributes, EventName } from "amazon-chime-sdk-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useMeetingManager } from "../MeetingProvider/index";

type MeetingEventProviderContextType =
  | {
      name: EventName;
      attributes: EventAttributes;
    }
  | undefined;

export const MeetingEventProviderContext = createContext<MeetingEventProviderContextType>(undefined);

type Props = {
  children: ReactNode
}

export const MeetingEventProvider = ({ children } : Props) => {
	const [meetingEvent, setMeetingEvent] = useState<MeetingEventProviderContextType>();
	const meetingManager = useMeetingManager();

	useEffect(() => {
		function meetingEventUpdateCallback(
			name: EventName,
			attributes: EventAttributes
		): void {
			setMeetingEvent({ name, attributes });
		}

		meetingManager.subscribeToEventDidReceive(meetingEventUpdateCallback);

		return () => {
			meetingManager.unsubscribeFromEventDidReceive(meetingEventUpdateCallback);
		};
	}, []);

	return (
		<MeetingEventProviderContext.Provider value={meetingEvent}>
			{ children }
		</MeetingEventProviderContext.Provider>
	)
};

export const useMeetingEvent = (): MeetingEventProviderContextType => useContext(MeetingEventProviderContext);

