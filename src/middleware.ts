/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. EXCLUSIONS : Fichiers statiques (JS, Fonts, Ads, etc.)
  // On ne redirige JAMAIS ces fichiers pour éviter le "Unexpected token <"
  const excludedPaths = [
    '/sitemap.xml', 
    '/robots.txt', 
    '/favicon.ico',
    '/ads.txt',
    '/fonts/ts-icons4e17.woff2',
    '/js/f6927642ba9082ad8dc3ee9ebfa2ee4f.js',
    '/js/436c92d375871a4de2f9bca5482b318f.js',
    '/js/26163b5c5f9f5b17b1a824a3bcf585c9.js',
    '/js/95d48ebe0fd227993325d142e6b718ef.js',
    '/js/059cf10036c1aff6209bc1476002b48d.js',
    '/js/bec7ef33f65e3d23332c9bb50b07ff9a.js',
    '/js/bc39a8b646d1336276bcbdd278bd276f.js',
  ];

  if (
    excludedPaths.includes(pathname) || 
    pathname.startsWith('/js/') || 
    pathname.startsWith('/fonts/') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. REDIRECTION /fr -> /en
  // Puisque ton site est désormais en anglais
  if (pathname.startsWith("/fr/") || pathname === "/fr") {
    const newPath = pathname.replace("/fr", "/en");
    return NextResponse.redirect(new URL(`${newPath}${search}`, request.url));
  }

  // 3. RACINE "/" -> "/en"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // 4. VERIFIER LA LOCALE (Focalisé sur "en")
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 5. SI PAS DE LOCALE -> FORCE "/en" (uniquement pour les pages)
  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/en${pathname}${search}`, request.url)
    );
  }

  return NextResponse.next();
}

// 6. MATCHER : On exclut les dossiers ressources du middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|js|fonts|img|favicon.ico|robots.txt|sitemap.xml).*)"],
};