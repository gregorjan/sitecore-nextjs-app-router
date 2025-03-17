import type { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs'
import { gql } from 'graphql-request'
import { serverConfig } from '../config.server'
import { client } from './client'

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
`

type LayoutResponse = {
	layout: { item: { rendered: LayoutServiceData } }
}

export const getLayoutData = async (routePath: string, language?: string): Promise<LayoutServiceData> => {
	const data = await client.request<LayoutResponse>(layoutQuery, {
		site: serverConfig.sitecoreSiteName,
		routePath,
		language,
	})

	return (
		data?.layout?.item?.rendered || {
			sitecore: { context: { pageEditing: false, language }, route: null },
		}
	)
}
