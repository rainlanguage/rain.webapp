import { NextResponse } from 'next/server';

export function middleware(req: any) {
	const url = req.nextUrl.clone();
	const host = req.headers.get('host') || '';

	// Split the host into its subdomains
	const domains = host.split('.');

	// Initialize subdomain
	let subdomain = '';

	// Determine if the request is from localhost or your production domains
	const isLocalhost = host.includes('localhost');
	const isProductionDomain = host.includes('rainframe.xyz') || host.includes('raindex.finance');

	if (isLocalhost) {
		if (domains.length > 1) {
			// localhost with subdomain
			subdomain = domains[0];
		} else {
			// localhost without subdomain
			subdomain = 'raindex';
		}
	} else if (isProductionDomain) {
		if (domains.length > 2) {
			// Production domain with subdomain
			subdomain = domains[0];
		} else {
			// Production root domain
			subdomain = 'raindex';
		}
	}

	if (subdomain) {
		// Exclude certain paths from rewriting
		if (
			url.pathname.startsWith('/_images') ||
			url.pathname.startsWith('/my-strategies') ||
			url.pathname.startsWith('/favicon')
		) {
			return NextResponse.next();
		}
		url.pathname = `/${subdomain}${url.pathname}`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|api|static|favicon.ico).*)']
};
