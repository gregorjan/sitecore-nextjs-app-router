import { z } from "zod";
import { ClientConfigSchema } from "./config.client";
import { checkEnv } from "./utils/check-env";

const serverConfigMap = {
	sitecoreSiteName: process.env.SITECORE_SITE_NAME as string,
	defaultLanguage: process.env.DEFAULT_LANGUAGE as string,
	sitecoreEdgeUrl: process.env.SITECORE_EDGE_URL as string,
	sitecoreEdgeContextId: process.env.SITECORE_EDGE_CONTEXT_ID as string,
	jssEditingSecret: process.env.JSS_EDITING_SECRET as string,
	editingAllowedOrigins: process.env.JSS_ALLOWED_ORIGINS,
};

const ServerConfigSchema = ClientConfigSchema.extend({
	jssEditingSecret: z.string(),
	editingAllowedOrigins: z.string().optional(),
});

export type ServerConfig = z.infer<typeof ServerConfigSchema>;
export const serverConfig = checkEnv(serverConfigMap, ServerConfigSchema);
