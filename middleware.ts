import { type NextRequest, NextResponse } from "next/server";
import { serverConfig } from "./lib/config.server";
import { draftMode } from 'next/headers'

//TODO extract to environemnt variables
const locales = ['en', 'de']

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const { isEnabled } = await draftMode()
	const pageEditing = isEnabled && pathname.startsWith('/x-neo-editor')

	if (pageEditing) return

	const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

	if (pathnameHasLocale) return

	const acceptLanguageHeader = request.headers.get('accept-language')

	const locale =
		acceptLanguageHeader && locales.includes(acceptLanguageHeader) ? acceptLanguageHeader : serverConfig.defaultLanguage

	request.nextUrl.pathname = `/${locale}${pathname}`

	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sitemap.xml).*)'],
}
