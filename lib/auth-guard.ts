// lib/auth-guard.ts
// Utilitaire de sécurité partagé par toutes les API routes
// À importer dans chaque route protégée

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

type GuardResult =
  | {
      ok: true;
      user: {
        id: string;
        role: Role;
        clerkId: string;
        prenom: string;
        nom: string;
      };
    }
  | { ok: false; response: NextResponse };

/**
 * Vérifie que l'utilisateur est connecté ET que son rôle
 * est dans la liste des rôles autorisés.
 *
 * Usage dans une route :
 *   const guard = await requireRole(["OFFICIER", "ADMIN"]);
 *   if (!guard.ok) return guard.response;
 *   const { user } = guard;
 */
export async function requireRole(allowedRoles: Role[]): Promise<GuardResult> {
  // ÉTAPE 1 — Clerk vérifie le JWT signé cryptographiquement
  // Un attaquant ne peut pas forger ce token sans la clé privée Clerk
  const { userId } = await auth();

  if (!userId) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Non authentifié. Veuillez vous connecter." },
        { status: 401 },
      ),
    };
  }

  // ÉTAPE 2 — On lit le rôle DEPUIS LA BASE DE DONNÉES
  // Jamais depuis le token ou le body de la requête
  // Un attaquant peut manipuler l'URL ou les headers, pas la DB
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, role: true, clerkId: true, prenom: true, nom: true },
  });

  if (!user) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Compte introuvable. Contactez l'administration." },
        { status: 404 },
      ),
    };
  }

  // ÉTAPE 3 — Le rôle en DB correspond-il aux rôles autorisés ?
  // C'est ici qu'un utilisateur malveillant est définitivement bloqué
  // Peu importe ce qu'il envoie, seul le rôle en DB compte
  if (!allowedRoles.includes(user.role)) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Accès refusé. Votre rôle ne permet pas cette action.",
        },
        { status: 403 },
      ),
    };
  }

  return { ok: true, user };
}

// Raccourci : tout utilisateur connecté (n'importe quel rôle)
export async function requireAuth(): Promise<GuardResult> {
  return requireRole(["CITOYEN", "OFFICIER", "ADMIN"]);
}
