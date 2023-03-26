import { useEffect, useRef } from "react";
import styled from "styled-components";

import { useApplyVideoObjectFit } from "../../../hooks/useApplyVideoObjectFit";
import { useAudioVideo } from "../../../providers/AudioVideoProvider";
import { useLocalVideo } from "../../../providers/LocalVideoProvider";
import { VideoTile } from "../../ui/VideoTile";
import { BaseSdkProps } from "../Base";

interface Props extends BaseSdkProps {
  id?: string;
  nameplate?: string;
}

const StyledLocalVideo = styled<any>(VideoTile)`
  ${(props) => (!props.active ? "display: none" : "")};
`;

export const LocalVideo = ({ nameplate, ...rest } : Props) => {
	const { tileId, isVideoEnabled } = useLocalVideo();
	const audioVideo = useAudioVideo();
	const videoEl = useRef<HTMLVideoElement>(null);
	useApplyVideoObjectFit(videoEl);

	useEffect(() => {
		if (!audioVideo || !tileId || !videoEl.current || !isVideoEnabled) {
			return;
		}

		audioVideo.bindVideoElement(tileId, videoEl.current);

		return () => {
			const tile = audioVideo.getVideoTile(tileId);
			if (tile) {
				audioVideo.unbindVideoElement(tileId);
			}
		};
	}, [audioVideo, tileId, isVideoEnabled]);

	return (
		<StyledLocalVideo
			active={isVideoEnabled}
			nameplate={nameplate}
			ref={videoEl}
			{...rest}
		/>
	);
};