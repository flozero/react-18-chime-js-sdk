import { memo } from "react";
import { useRemoteVideoTileState } from "../../../providers/RemoteVideoTileProvider";
import { useRosterState } from "../../../providers/RosterProvider";
import { BaseSdkProps } from "../Base";
import { RemoteVideo } from "../RemoteVideo";

const _RemoteVideos = (props: BaseSdkProps) => {
	const { roster } = useRosterState();
	const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();

	return (
		<>
			{tiles.map((tileId) => {
				const attendee = roster[tileIdToAttendeeId[tileId]] || {};
				const { name }: any = attendee;
				return (
					<RemoteVideo {...props} key={tileId} tileId={tileId} name={name} />
				);
			})}
		</>
	);
};

export const RemoteVideos = memo(_RemoteVideos)
