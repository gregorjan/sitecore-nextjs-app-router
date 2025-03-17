import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { serverConfig } from './lib/config.server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const { isEnabled } = await draftMode()
	const pageEditing = isEnabled && pathname.startsWith('/x-editor-jss-route')

	if (pageEditing) return

	const locales = serverConfig.locales

	const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

	if (pathnameHasLocale) return

	const acceptLanguageHeader = request.headers.get('accept-language')

	const locale =
		acceptLanguageHeader && locales.includes(acceptLanguageHeader) ? acceptLanguageHeader : serverConfig.defaultLocale

	request.nextUrl.pathname = `/${locale}${pathname}`

	return NextResponse.redirect(request.nextUrl)
}

export const config = {
	matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sitemap.xml).*)'],
}
