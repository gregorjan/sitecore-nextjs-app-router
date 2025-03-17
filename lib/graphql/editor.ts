import { type DictionaryPhrases, EditMode, type LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs'
import { GraphQLEditingService, LayoutKind } from '@sitecore-jss/sitecore-jss/editing'
import type { GraphQLEditingQueryResponse } from '@sitecore-jss/sitecore-jss/types/editing/graphql-editing-service'
import { gql } from 'graphql-request'
import { parseDictionary } from '../utils/parse-dictionary'
import { client } from './client'

export const editingQuery = gql`
 query EditingQuery(
    $itemId: String!
    $language: String!
    $site: String!
    $version: String
) {
    item(path: $itemId, language: $language, version: $version) {
      rendered
    }
    site {
      siteInfo(site: $site) {
        dictionary(language: $language) {
          results {
            key
            value
          }
        }
      }
    }
  }
`

type EditingDataParams = {
	siteName: string
	itemId: string
	locale: string
	version?: string
	layoutKind: string
}

export const getEditingData = async ({
	itemId,
	layoutKind,
	siteName,
	version,
	locale,
}: EditingDataParams): Promise<[LayoutServiceData, DictionaryPhrases]> => {
	const editingData = await client.request<GraphQLEditingQueryResponse>(
		editingQuery,
		{
			itemId,
			language: locale,
			site: siteName,
			version,
		},
		{
			sc_layoutKind: layoutKind,
			sc_editMode: 'true',
		},
	)

	const dictionary = parseDictionary(editingData.site.siteInfo.dictionary.results)

	const layoutData = editingData?.item?.rendered || {
		sitecore: {
			context: { pageEditing: true, locale, editMode: EditMode.Metadata },
			route: null,
		},
	}

	return [layoutData, dictionary]
}
