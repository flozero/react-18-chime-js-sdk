import { useEffect, useRef } from "react";

import { useAudioVideo } from "../../../providers/AudioVideoProvider";
import { useContentShareState } from "../../../providers/ContentShareProvider";
import { ContentTile } from "../../ui/ContentTile";
import { BaseSdkProps } from "../Base";

export const ContentShare = ({ className, ...rest }: BaseSdkProps) => {
	const audioVideo = useAudioVideo();
	const { tileId } = useContentShareState();
	const videoEl = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (!audioVideo || !videoEl.current || !tileId) {
			return;
		}

		audioVideo.bindVideoElement(tileId, videoEl.current);

		return () => {
			const tile = audioVideo.getVideoTile(tileId);
			if (tile) {
				audioVideo.unbindVideoElement(tileId);
			}
		};
	}, [audioVideo, tileId]);

	return tileId ? (
		<ContentTile
			objectFit="contain"
			className={className || ""}
			{...rest}
			ref={videoEl}
		/>
	) : null;
};
