import { useEffect, useState } from "react";

import { useMeetingManager } from "../../providers/MeetingProvider";
import { DeviceLabelTriggerStatus } from "../../types";

export const useDeviceLabelTriggerStatus = (): DeviceLabelTriggerStatus => {
	const meetingManager = useMeetingManager();
	const [status, setStatus] = useState<DeviceLabelTriggerStatus>(
		DeviceLabelTriggerStatus.UNTRIGGERED
	);

	useEffect(() => {
		meetingManager.subscribeToDeviceLabelTriggerStatus(setStatus);
		return () => {
			meetingManager.unsubscribeFromDeviceLabelTriggerStatus(setStatus);
		};
	}, [meetingManager]);

	return status;
}