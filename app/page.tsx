"use server";

import type { NextPageProps } from "@/lib/types";
import { draftMode } from "next/headers";
import { PreviewSearchParamsSchema } from "@/lib/utils/schemas";
import { formatZodError } from "@/lib/utils/format-zod-error";
import { serverConfig } from "@/lib/config.server";
import { getEditingData } from "@/lib/graphql/editor";
import { PageLayout } from "@/base/PageLayout";
import { EditingScripts } from "@/atoms/EditingScripts";

export default async function Page(props: NextPageProps) {
	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		return null
	}

	const { data, error } = PreviewSearchParamsSchema.safeParse(
		await props.searchParams,
	);

	if (error) {
		return formatZodError(error, "Missing required values search params");
	}

	const { secret } = data;

	if (secret !== serverConfig.jssEditingSecret) {
		return "Missing or invalid editing secret";
	}

	const { sc_site, sc_itemid, sc_version, sc_layoutKind, sc_lang } = data;

	const [layoutData, dictionary] = await getEditingData({
		siteName: sc_site,
		itemId: sc_itemid,
		version: sc_version,
		locale: sc_lang,
		layoutKind: sc_layoutKind,
	});



	return (
		<>
			<PageLayout layoutData={layoutData} dictionary={dictionary} />
			<EditingScripts
				clientData={layoutData.sitecore.context.clientData}
				clientScripts={layoutData.sitecore.context.clientScripts}
			/>
		</>
	);
}
