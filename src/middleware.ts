import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  if (pathname === "/profile") {
    return NextResponse.redirect(new URL("/profile/me", request.url));
  }
}

export const config = {
  matcher: "/profile",
};
