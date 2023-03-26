import {useAttendeeStatus} from "../../../hooks/sdk/useAttendeeStatus";
import { useRosterState } from "../../../providers/RosterProvider";
import { RosterCell, RosterCellProps } from "../../ui/Roster/RosterCell";
import { BaseSdkProps } from "../Base";
import { MicrophoneActivity } from "../MicrophoneActivity";

export interface RosterAttendeeProps
  extends Omit<RosterCellProps, "name">,
    BaseSdkProps {
  /** The ID of a Chime meeting attendee. */
  attendeeId: string;
}

export const RosterAttendee = ({
	attendeeId,
	...rest
} : RosterAttendeeProps) => {
	const { muted, videoEnabled, sharingContent } = useAttendeeStatus(attendeeId);
	const { roster } = useRosterState();
	const attendeeName = roster[attendeeId]?.name || "";

	return (
		<RosterCell
			name={attendeeName}
			muted={muted}
			videoEnabled={videoEnabled}
			sharingContent={sharingContent}
			microphone={<MicrophoneActivity attendeeId={attendeeId} />}
			{...rest}
		/>
	);
};
