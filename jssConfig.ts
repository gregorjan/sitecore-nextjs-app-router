import { ZodError, type ZodType, z, infer } from "zod";

const baseConfig = {
	sitecoreSiteName: process.env.SITECORE_SITE_NAME as string,
	defaultLanguage: process.env.DEFAULT_LANGUAGE as string,
	sitecoreEdgeUrl: process.env.SITECORE_EDGE_URL as string,
	sitecoreEdgeContextId: process.env.SITECORE_EDGE_CONTEXT_ID as string,
	// sites: process.env.SITES as string
};

const ConfigSchema = z.object({
	sitecoreSiteName: z.string(),
	defaultLanguage: z.string(),
	sitecoreEdgeUrl: z.string(),
	sitecoreEdgeContextId: z.string(),
});

export type JssConfig = z.infer<typeof ConfigSchema>
export let jssConfig: JssConfig

try {
	jssConfig = ConfigSchema.parse(baseConfig);
} catch (error) {
	if (error instanceof ZodError) {
		const message = error.issues.map((issue) => issue.path[0]);
		throw new Error(`Missing required values in .env: ${message.join(", ")}`);
	}
	console.error(error);
}


