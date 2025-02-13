import { authConfig } from "@/server/auth/config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/verify-email"];
const apiPrefix = "/api";
const authRoutes = ["/sign-in", "/sign-up"];
const signInUrl = "/sign-in";
const redirectUrl = "/";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = request.auth;
  const isAuthRoute = pathname === "/" ? false : authRoutes.includes(pathname);
  const isProtectedRoute =
    !authRoutes.includes(pathname) &&
    !publicRoutes.includes(pathname) &&
    !pathname.startsWith(apiPrefix);

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(redirectUrl, request.nextUrl));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(signInUrl, request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
