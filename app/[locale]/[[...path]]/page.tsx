"use server";

import type { Metadata, ResolvingMetadata } from "next";
import type { NextPageProps } from "@/lib/types";
import Layout from "@/base/Layout";
import {
	getLayoutData,
} from "@/lib/graphql/layout";
import {
	getDictionaryData,
} from "@/lib/graphql/dictionary";
import { extractPath } from "@/lib/utils/extract-path";
import { jssConfig } from "@/jssConfig";
import { notFound } from "next/navigation";

// const dictionaryService = getDictionaryService(jssConfig.sitecoreSiteName);

export default async function Page({ params }: NextPageProps) {
	const { locale, path } = await params;

	const extractedPath = extractPath(path);

	const [layoutData, dictionary] = await Promise.all([
		getLayoutData(extractedPath, locale),
		getDictionaryData(locale),
	]);

	if (!layoutData?.sitecore?.route) {
		return notFound();
	}

	return <Layout layoutData={layoutData} dictionary={dictionary} />;
}

export async function generateMetadata(
	{ params }: NextPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { locale, path } = await params;
	const extractedPath = extractPath(path);
	const layoutData = await getLayoutData(extractedPath, locale);

	const { Headline, Description } = layoutData.sitecore.route?.fields as {
		Headline: { value: string };
		Description: { value: string };
	};

	return {
		title: Headline.value,
		description: Description.value,
	};
}
