import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth-guard";

export async function GET() {
  const guard = await requireAuth();
  if (!guard.ok) return guard.response;
  const { user } = guard;

  const declarations = await prisma.declaration.findMany({
    where: user.role === "CITOYEN" ? { citoyenId: user.id } : {},
    include: {
      citoyen: { select: { prenom: true, nom: true, email: true } },
      officierValidateur: { select: { prenom: true, nom: true } },
      demandes: { select: { id: true, type: true, statut: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(declarations);
}

export async function POST(req: Request) {
  const guard = await requireRole(["CITOYEN"]);
  if (!guard.ok) return guard.response;
  const { user } = guard;

  const body = await req.json();
  const {
    prenomEnfant,
    nomEnfant,
    dateNaissance,
    lieuNaissance,
    sexe,
    prenomPere,
    nomPere,
    nationalitePere,
    prenomMere,
    nomMere,
    nationaliteMere,
  } = body;

  if (
    !prenomEnfant ||
    !nomEnfant ||
    !dateNaissance ||
    !lieuNaissance ||
    !sexe ||
    !prenomPere ||
    !nomPere ||
    !prenomMere ||
    !nomMere
  ) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants" },
      { status: 400 },
    );
  }

  const declaration = await prisma.declaration.create({
    data: {
      citoyenId: user.id,
      prenomEnfant,
      nomEnfant,
      dateNaissance: new Date(dateNaissance),
      lieuNaissance,
      sexe,
      prenomPere,
      nomPere,
      nationalitePere: nationalitePere ?? null,
      prenomMere,
      nomMere,
      nationaliteMere: nationaliteMere ?? null,
    },
  });
  return NextResponse.json(declaration, { status: 201 });
}
