"use server";

import type { NextPageProps } from "@/lib/types";
import { draftMode } from "next/headers";
import { PreviewPage } from "@/base/PreviewPage";
import { PreviewSearchParamsSchema } from "@/lib/utils/schemas";
import { formatZodError } from "@/lib/utils/format-zod-error";
import { serverConfig } from "@/lib/config.server";

export default async function Page(props: NextPageProps) {
	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		throw new Error("not in preview");
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

	return <PreviewPage searchParams={data} />;
}
