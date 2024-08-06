import { NextResponse } from "next/server";

export function middleware(req: any) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Extract domains
  const domains = host.split(".");

  if (domains.length === 1) {
    return NextResponse.next();
  }

  // Add logic to handle different subdomains
  const subdomain = domains[0];
  url.pathname = `/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
