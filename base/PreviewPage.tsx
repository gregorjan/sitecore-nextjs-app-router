"use server";

import Layout from "@/base/Layout";
import { getEditingData } from "@/lib/graphql/editor";
import type { PreviewSearchParams } from "@/lib/utils/schemas";
import { EditingScripts } from "@/atoms/EditingScripts";

export const PreviewPage: React.FC<{
	searchParams: PreviewSearchParams;
}> = async ({ searchParams }) => {
	const { sc_site, sc_itemid, sc_version, sc_layoutKind, sc_lang } =
		searchParams;

	const [layoutData, dictionary] = await getEditingData({
		siteName: sc_site,
		itemId: sc_itemid,
		version: sc_version,
		locale: sc_lang,
		layoutKind: sc_layoutKind,
	});

	return (
		<>
			<Layout layoutData={layoutData} dictionary={dictionary} />
			<EditingScripts
				clientData={layoutData.sitecore.context.clientData}
				clientScripts={layoutData.sitecore.context.clientScripts}
			/>
		</>
	);
};
