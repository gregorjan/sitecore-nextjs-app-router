import type { DictionaryPhrases } from "@sitecore-jss/sitecore-jss/i18n";

export const parseDictionary = (results: { key: string; value: string }[]) => {
	return results.reduce((acc, { key, value }) => {
		acc[key] = value;
		return acc;
	}, {} as DictionaryPhrases);
};
