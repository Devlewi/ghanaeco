/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. EXCLUSIONS : On laisse passer tout ce qui ressemble à un fichier ou une route système
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api/') || 
    pathname.startsWith('/_next/') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/ads.txt'
  ) {
    return NextResponse.next();
  }

  // 2. RACINE "/" -> REWRITE vers "/en"
  // L'URL reste https://nigeria-eco.com/ mais affiche le contenu de /en
  // C'est la clé pour corriger l'erreur "Page avec redirection" dans Search Console
  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/en${search}`, request.url));
  }

  // 3. ANCIEN /fr -> REDIRECT 301 vers /en
  // Ici on utilise une redirection PERMANENTE (301) pour transférer le SEO vers l'anglais
  if (pathname.startsWith("/fr/") || pathname === "/fr") {
    const newPath = pathname.replace("/fr", "/en");
    return NextResponse.redirect(new URL(`${newPath}${search}`, request.url), 301);
  }

  // 4. VERIFIER LA LOCALE
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 5. SI PAS DE LOCALE -> REWRITE vers "/en"
  // Exemple: /article-slug devient /en/article-slug de manière invisible
  if (!pathnameHasLocale) {
    return NextResponse.rewrite(
      new URL(`/en${pathname}${search}`, request.url)
    );
  }

  return NextResponse.next();
}

// 6. MATCHER : On garde l'exclusion des dossiers techniques
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|js|fonts|img|favicon.ico|robots.txt|sitemap.xml|ads.txt).*)"],
};