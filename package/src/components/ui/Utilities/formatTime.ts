export const formatTime = (time: string) => {
	const t = new Date(time).toLocaleTimeString();
	return t.slice(0, t.length - 6) + t.slice(t.length - 3, t.length);
};
