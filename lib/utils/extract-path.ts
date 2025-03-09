export const extractPath = (path?: string[]): string => {
	if (!path) return "/";
	
	return `/${path.join("/")}`;
};
