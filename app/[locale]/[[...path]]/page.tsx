"use server";

import type { NextPageProps } from "@/lib/types";
import { extractPath } from "@/lib/utils/extract-path";
import { getLayoutData } from "@/lib/graphql/layout";
import { getDictionaryData } from "@/lib/graphql/dictionary";
import { notFound } from "next/navigation";
import { PageLayout } from "@/base/PageLayout";
import type { Metadata } from "next";

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

	return <PageLayout layoutData={layoutData} dictionary={dictionary} />;
}

export async function generateMetadata({
	params,
}: NextPageProps): Promise<Metadata> {
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
