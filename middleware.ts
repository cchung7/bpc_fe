import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./src/services";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  ADMIN: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(
        `/login?redirectPath=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  const userRole = userInfo.role as Role;

  if (userRole && roleBasedPrivateRoutes[userRole]) {
    const allowedRoutes = roleBasedPrivateRoutes[userRole];

    const hasAccess = allowedRoutes.some((route) => pathname.match(route));
    if (hasAccess) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/admin/:path*"],
};
