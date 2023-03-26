import { HTMLAttributes, memo } from "react";

import { useContentShareState } from "../../../providers/ContentShareProvider";
import { useFeaturedTileState } from "../../../providers/FeaturedVideoTileProvider";
import { useRemoteVideoTileState } from "../../../providers/RemoteVideoTileProvider";
import { useRosterState } from "../../../providers/RosterProvider";
import { useGridData } from "../../ui/VideoGrid";
import { BaseSdkProps } from "../Base";
import { RemoteVideo } from "../RemoteVideo";

interface Props
  extends BaseSdkProps,
    Omit<HTMLAttributes<HTMLDivElement>, "css"> {}

const _FeaturedRemoteVideos = (props: Props) => {
	const gridData = useGridData();
	const { roster } = useRosterState();
	const { tileId: featuredTileId } = useFeaturedTileState();
	const { tileId: contentTileId } = useContentShareState();
	const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();

	return (
		<>
			{tiles.map((tileId) => {
				const featured = !contentTileId && featuredTileId === tileId;
				const styles = gridData && featured ? "grid-area: ft;" : "";
				const classes = `${featured ? "ch-featured-tile" : ""} ${
					props.className || ""
				}`;
				const attendee = roster[tileIdToAttendeeId[tileId]] || {};
				const { name }: any = attendee;

				return (
					<RemoteVideo
						tileId={tileId}
						name={name}
						{...props}
						className={classes}
						key={tileId}
						css={styles}
					/>
				);
			})}
		</>
	);
};

export const FeaturedRemoteVideos = memo(_FeaturedRemoteVideos)