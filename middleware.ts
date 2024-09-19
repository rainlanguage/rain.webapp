import { NextResponse } from "next/server";

export function middleware(req: any) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Split the host into its subdomains
  const domains = host.split(".");

  // Handle root domain, accounting for localhost and Vercel deployments
  const isLocalhostWithSubdomain =
    host.includes("localhost") && domains.length > 1;
  const isVercelWithSubdomain =
    host.includes("rainframe.xyz") && domains.length > 2;
  if (isLocalhostWithSubdomain || isVercelWithSubdomain) {
    // Add logic to handle different subdomains
    const subdomain = domains[0];
    console.log({ url });
    if (
      url.pathname.startsWith("/_images") ||
      url.pathname.startsWith("/my-strategies") ||
      url.pathname.startsWith("/favicon")
    ) {
      return NextResponse.next();
    }
    url.pathname = `/${subdomain}${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
