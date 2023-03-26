import { RefObject, useEffect } from "react";

export const useApplyVideoObjectFit = (videoEl: RefObject<HTMLVideoElement>) => {
	useEffect(() => {
		function onLoaded() {
			if (!videoEl.current) {
				return;
			}

			const height = videoEl.current.videoHeight;
			const width = videoEl.current.videoWidth;

			videoEl.current.style.objectFit = height > width ? "contain" : "cover";
		}

		videoEl.current?.addEventListener("loadedmetadata", onLoaded);

		return () =>
			videoEl.current?.removeEventListener("loadedmetadata", onLoaded);
	}, [videoEl]);
}
