// app/api/demandes/route.ts
// POST → faire une demande d'extrait (citoyen uniquement)
// GET  → lister ses demandes

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ── GET /api/demandes ──
export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user)
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 },
    );

  const demandes = await prisma.demandeExtrait.findMany({
    where: user.role === "CITOYEN" ? { citoyenId: user.id } : {},
    include: {
      declaration: {
        select: {
          prenomEnfant: true,
          nomEnfant: true,
          numeroActe: true,
          dateNaissance: true,
        },
      },
      citoyen: { select: { prenom: true, nom: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(demandes);
}

// ── POST /api/demandes ──
// Body: { declarationId: string, type: "INTEGRALE" | "AVEC_FILIATION" | "SANS_FILIATION" }
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user)
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 },
    );

  if (user.role !== "CITOYEN") {
    return NextResponse.json(
      { error: "Seul un citoyen peut faire une demande d'extrait" },
      { status: 403 },
    );
  }

  const { declarationId, type } = await req.json();

  if (!declarationId || !type) {
    return NextResponse.json(
      { error: "declarationId et type sont obligatoires" },
      { status: 400 },
    );
  }

  // Vérifier que la déclaration est bien VALIDÉE
  const declaration = await prisma.declaration.findUnique({
    where: { id: declarationId },
  });
  if (!declaration) {
    return NextResponse.json(
      { error: "Déclaration introuvable" },
      { status: 404 },
    );
  }
  if (declaration.statut !== "VALIDEE") {
    return NextResponse.json(
      {
        error:
          "La déclaration doit être validée avant de faire une demande d'extrait",
      },
      { status: 400 },
    );
  }
  if (declaration.citoyenId !== user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const demande = await prisma.demandeExtrait.create({
    data: {
      declarationId,
      citoyenId: user.id,
      type,
      statut: "EN_COURS",
    },
  });

  return NextResponse.json(demande, { status: 201 });
}
