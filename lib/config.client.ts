import { z } from 'zod'
import { checkEnv } from './utils/check-env'

const clientConfigMap = {
	sitecoreSiteName: process.env.SITECORE_SITE_NAME as string,
	defaultLanguage: process.env.DEFAULT_LANGUAGE as string,
	sitecoreEdgeUrl: process.env.SITECORE_EDGE_URL as string,
	sitecoreEdgeContextId: process.env.SITECORE_EDGE_CONTEXT_ID as string,
}

export const ClientConfigSchema = z.object({
	sitecoreSiteName: z.string(),
	defaultLanguage: z.string(),
	sitecoreEdgeUrl: z.string(),
	sitecoreEdgeContextId: z.string(),
})

export type ClientConfig = z.infer<typeof ClientConfigSchema>
export const clientConfig = checkEnv(clientConfigMap, ClientConfigSchema)
