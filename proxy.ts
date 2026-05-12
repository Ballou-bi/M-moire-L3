// middleware.ts
// Protection des routes + redirection automatique vers le bon dashboard selon le rôle

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const isPublic = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk(.*)",
]);

// Routes réservées à chaque rôle
const isOfficierRoute = createRouteMatcher(["/dashboard/officier(.*)"]);
const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);
const isDashboard = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // 1. Laisser passer les routes publiques
  if (isPublic(req)) return NextResponse.next();

  // 2. Forcer la connexion sur toutes les autres routes
  const { userId } = await auth.protect();

  // 3. Si l'utilisateur accède à un dashboard, vérifier son rôle en DB
  if (isDashboard(req) && userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    });

    if (user) {
      const role = user.role;
      const path = req.nextUrl.pathname;

      // Citoyen qui tente d'accéder à officier ou admin → redirigé
      if (role === "CITOYEN" && (isOfficierRoute(req) || isAdminRoute(req))) {
        return NextResponse.redirect(new URL("/dashboard/citoyen", req.url));
      }

      // Officier qui tente d'accéder à admin → redirigé
      if (role === "OFFICIER" && isAdminRoute(req)) {
        return NextResponse.redirect(new URL("/dashboard/officier", req.url));
      }

      // Officier/Admin qui atterrit sur /dashboard/citoyen → redirigé vers son vrai dashboard
      if (role === "OFFICIER" && path === "/dashboard/citoyen") {
        return NextResponse.redirect(new URL("/dashboard/officier", req.url));
      }
      if (role === "ADMIN" && path === "/dashboard/citoyen") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
