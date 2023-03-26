import { useEffect, useState } from "react";

import { useMeetingManager } from "../../providers/MeetingProvider";
import { MeetingStatus } from "../../types";

export const useMeetingStatus = (): MeetingStatus => {
	const meetingManager = useMeetingManager();
	const [meetingStatus, setMeetingStatus] = useState(
		() => meetingManager.meetingStatus
	);

	useEffect(() => {
		const callback = (updatedMeetingStatus: MeetingStatus): void => {
			setMeetingStatus(updatedMeetingStatus);
		};
		meetingManager.subscribeToMeetingStatus(callback);

		return (): void => {
			meetingManager.unsubscribeFromMeetingStatus(callback);
		};
	}, []);

	return meetingStatus;
};
