// middleware.ts
// Protection des routes avec Clerk

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes publiques (accessibles sans connexion)
const isPublicRoute = createRouteMatcher([
  "/", // Page d'accueil
  "/sign-in(.*)", // Page connexion Clerk
  "/sign-up(.*)", // Page inscription Clerk
  "/api/webhooks/clerk(.*)", // Webhook Clerk (ne doit pas être protégé)
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // Redirige vers /sign-in si non connecté
  }
});

export const config = {
  matcher: [
    // Applique le middleware à toutes les routes sauf fichiers statiques
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
