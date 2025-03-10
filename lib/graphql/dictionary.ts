import { jssConfig } from "@/jssConfig";
import type { DictionaryPhrases } from "@sitecore-jss/sitecore-jss-nextjs";
import { gql } from "graphql-request";
import { client } from "./client";
import type { DictionarySiteQueryResponse } from "@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service";

const dictionaryQuery = gql`
 query DictionarySiteQuery(
   $siteName: String!
   $language: String!
 ) {
   site {
     siteInfo(site: $siteName) {
       dictionary(language: $language) {
         results {
           key
           value
         }
       }
     }
   }
 }
`;

export const getDictionaryData = async (language?: string): Promise<DictionaryPhrases> => {
	const data = await client.request<DictionarySiteQueryResponse>(
		dictionaryQuery,
		{
			siteName: jssConfig.sitecoreSiteName,
			language,
		},
	);

	const results = data.site.siteInfo.dictionary.results;

	return results.reduce((acc, { key, value }) => {
		acc[key] = value;
		return acc;
	}, {} as DictionaryPhrases);
};
