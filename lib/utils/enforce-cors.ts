
import { EDITING_ALLOWED_ORIGINS } from "@sitecore-jss/sitecore-jss/editing";
import { serverConfig } from "../config.server";

const convertToWildcardRegex = (pattern: string) => {
	return `^${pattern.replace(/\//g, "\\/").replace(/\./g, "\\.").replace(/\*/g, ".*")}$`;
};

export const enforceCors = (origin: string): boolean => {
	const allowedOrigins = [...EDITING_ALLOWED_ORIGINS];
	if (serverConfig.editingAllowedOrigins) {
		allowedOrigins.concat(serverConfig.editingAllowedOrigins.split(","));
	}

	return (
		!!origin &&
		allowedOrigins.some(
			(allowedOrigin) =>
				origin === allowedOrigin ||
				new RegExp(convertToWildcardRegex(allowedOrigin)).test(origin),
		)
	);
};