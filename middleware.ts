import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "flexup_session";
const AUTH_ROUTES = ["/auth", "/login", "/register"];
const PUBLIC_ROUTES = ["/", "/landing", ...AUTH_ROUTES];
const PUBLIC_FILE = /\.(.*)$/;

const normalizePathname = (pathname: string) => {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
};

const matchesRoute = (pathname: string, route: string) => {
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const normalizedPath = normalizePathname(pathname);
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  const isAuthPath = AUTH_ROUTES.some((route) =>
    matchesRoute(normalizedPath, route)
  );
  const isAllowedWithoutSession = PUBLIC_ROUTES.some((route) =>
    matchesRoute(normalizedPath, route)
  );

  if (!hasSession && !isAllowedWithoutSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && (isAuthPath || matchesRoute(normalizedPath, "/landing"))) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
