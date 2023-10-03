import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!request.nextUrl.pathname.startsWith("/auth") && !token) {
    request.cookies.delete("token");

    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (request.nextUrl.pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
