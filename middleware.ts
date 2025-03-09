import { type NextRequest, NextResponse } from "next/server";
import { jssConfig } from "./jssConfig";

const locales = ["en", "de"];

export function middleware(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	const acceptLanguageHeader = request.headers.get("accept-language");

	const locale =
		acceptLanguageHeader && locales.includes(acceptLanguageHeader)
			? acceptLanguageHeader
			: jssConfig.defaultLanguage;

	request.nextUrl.pathname = `/${locale}${pathname}`;
	// e.g. incoming request is /products
	// The new URL is now /en-US/products
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next).*)",
		// Optional: only run on root (/) URL
		// '/'
	],
};
