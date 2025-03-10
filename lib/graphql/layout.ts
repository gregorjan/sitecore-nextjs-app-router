import { jssConfig } from "@/jssConfig";
import type { LayoutServiceData } from "@sitecore-jss/sitecore-jss-nextjs";
import { gql } from "graphql-request";
import { client } from "./client";

export const GRAPHQL_LAYOUT_QUERY_NAME = "";

const layoutQuery = gql`
query JssLayoutQuery(
  $site: String!
  $routePath: String!
  $language: String!
) {
  layout(site: $site, routePath: $routePath, language: $language){
			item {
				rendered
			}
		}
}
`;

type LayoutResponse = {
	layout: { item: { rendered: LayoutServiceData } };
};

export const getLayoutData = async (
	routePath: string,
	language?: string,
): Promise<LayoutServiceData> => {
	const data = await client.request<LayoutResponse>(layoutQuery, {
		site: jssConfig.sitecoreSiteName,
		routePath,
		language,
	});

	return (
		data?.layout?.item?.rendered || {
			sitecore: { context: { pageEditing: false, language }, route: null },
		}
	);
};
