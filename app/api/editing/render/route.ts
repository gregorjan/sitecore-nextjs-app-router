import { serverConfig } from "@/lib/config.server";
import { formatZodError } from "@/lib/utils/format-zod-error";
import { PreviewSearchParamsSchema } from "@/lib/utils/schemas";
import { draftMode } from "next/headers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const url = new URL(request.url);

	const secret = url.searchParams.get("secret");

	if (secret !== serverConfig.jssEditingSecret) {
		return new NextResponse(
			JSON.stringify({ message: "Missing or invalid editing secret" }),
			{
				status: 401,
			},
		);
	}

	const searchParamsObject = Object.fromEntries(url.searchParams.entries());
	const { data: searchParams, error } =
		PreviewSearchParamsSchema.safeParse(searchParamsObject);

	if (error) {
		return new NextResponse(
			JSON.stringify({
				message: formatZodError(error, "missing required search params: "),
			}),
			{
				status: 401,
			},
		);
	}

	const bypassToken = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
	const params = new URLSearchParams(searchParams);

	if (bypassToken) {
		params.append("x-vercel-set-bypass-cookie", "samesitenone");
		params.append("x-vercel-protection-bypass", bypassToken);
	}

	const redirectUrl = new URL(
		`?${params.toString()}`,
		url.origin,
	);

	const draft = await draftMode();
	draft.enable();

	//* Change sameSite draft cookie settings to allow editing mode in an iFrame for sitecore pages editor
	//* https://github.com/vercel/next.js/issues/49927#issuecomment-2642734026

	const cookieStore = await cookies();

	const draftCookie = cookieStore.get("__prerender_bypass");

	if (draftCookie) {
		cookieStore.set({
			name: "__prerender_bypass",
			value: draftCookie.value,
			httpOnly: true,
			path: "/",
			secure: true,
			sameSite: "none",
		});
	}

	return NextResponse.redirect(redirectUrl);
}
