import { type NextRequest, NextResponse } from "next/server";
import { serverConfig } from "./lib/config.server";

const locales = ["en", "de"];

export function middleware(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl;

	const pageEditing = searchParams.get('mode') === 'edit'
	if(pageEditing) return
	
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	const acceptLanguageHeader = request.headers.get("accept-language");

	const locale =
		acceptLanguageHeader && locales.includes(acceptLanguageHeader)
			? acceptLanguageHeader
			: serverConfig.defaultLanguage;

	request.nextUrl.pathname = `/${locale}${pathname}`;

	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico).*)'],
};
