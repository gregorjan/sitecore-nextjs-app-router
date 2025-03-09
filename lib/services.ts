import { GraphQLDictionaryService } from "@sitecore-jss/sitecore-jss-nextjs";
import { GraphQLLayoutService } from "@sitecore-jss/sitecore-jss-nextjs";
import { GraphQLRequestClient } from "@sitecore-jss/sitecore-jss";
import { jssConfig } from "@/jssConfig";

const clientFactory = GraphQLRequestClient.createClientFactory({
	endpoint: `${jssConfig.sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${jssConfig.sitecoreEdgeContextId}`,
});

export const getLayoutService = (siteName: string) =>
	new GraphQLLayoutService({
		siteName,
		clientFactory,
		retries: 10,
	});

export const getDictionaryService = (siteName: string) =>
	new GraphQLDictionaryService({
		siteName,
		clientFactory,
		retries: 10,
		useSiteQuery: true,
	});
