import type {
	ComponentFields,
	ComponentParams,
	ComponentPropsCollection,
	ComponentRendering,
	DictionaryPhrases,
	HTMLLink,
	LayoutServiceData,
	SiteInfo,
} from "@sitecore-jss/sitecore-jss-nextjs";

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
	site: SiteInfo;
	locale: string;
	dictionary: DictionaryPhrases;
	componentProps: ComponentPropsCollection;
	notFound: boolean;
	layoutData: LayoutServiceData;
	headLinks: HTMLLink[];
	contentStyles?: string;
};

export type NextPageProps = {
	searchParams: Promise<unknown>;
	params: Promise<{ locale: string; path: string[] }>;
};

/**
 * Shared component props
 */
export type ComponentProps = {
	rendering: ComponentRendering;
	params?: ComponentParams & { RenderingIdentifier?: string };
	fields?: ComponentFields 
};
