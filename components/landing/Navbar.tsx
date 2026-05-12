// components/Navbar.tsx
// Server Component — adapte le bouton selon l'état de connexion Clerk
// - Non connecté : "Se connecter" → /sign-in?redirect_url=/dashboard/citoyen
// - Connecté     : "Mon espace"   → /dashboard/citoyen (ou officier/admin selon le rôle)

import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Redirige vers le bon dashboard selon le rôle
function getDashboardHref(role: string) {
  if (role === "OFFICIER") return "/dashboard/officier";
  if (role === "ADMIN") return "/dashboard/admin";
  return "/dashboard/citoyen";
}

export default async function Navbar() {
  const { userId } = await auth();

  let dashboardHref = "/dashboard/citoyen";
  let isConnected = false;

  if (userId) {
    isConnected = true;
    // Récupère le rôle depuis la DB pour pointer vers le bon dashboard
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    });
    if (user) dashboardHref = getDashboardHref(user.role);
  }

  return (
    <nav className="rn-nav">
      <Link href="dashboard/citoyen" className="rn-logo">
        Registre<span>Natal</span>
      </Link>

      <ul className="rn-nav-links">
        <li>
          <a href="#fonctionnalites">Fonctionnalités</a>
        </li>
        <li>
          <a href="#processus">Processus</a>
        </li>
        <li>
          <a href="#roles">Rôles</a>
        </li>
      </ul>

      {isConnected ? (
        /* Utilisateur connecté → lien direct vers son dashboard */
        <Link href={dashboardHref} className="rn-nav-cta">
          Mon espace
        </Link>
      ) : (
        /* Non connecté → page login, puis redirection automatique vers le dashboard */
        <Link
          href="/sign-in?redirect_url=/dashboard/citoyen"
          className="rn-nav-cta"
        >
          Se connecter
        </Link>
      )}
    </nav>
  );
}
